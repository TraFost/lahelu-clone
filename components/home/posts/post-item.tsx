import { useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import { Text, Image, Button, Icons, UserProfile, Dropdown } from '@/components/common';
import { options, shareOptions } from './dropdown';
import { useSupabase } from '@/hooks';
import { Post } from '@/types/post';
import { Colors } from '@/constants/Colors';

interface Props {
  item: Post;
  setUpdated: () => void;
  isScrolling: boolean;
}

const hashtagsButtonWidth = (hashtags: string) => {
  const length = hashtags.length;
  return length >= 6 ? length * 5 + 60 : length * 5 + 45;
};

export default function PostItem({ item, setUpdated, isScrolling }: Props) {
  const { update } = useSupabase();

  const upvoteAnim = useRef(new Animated.Value(0)).current;
  const downvoteAnim = useRef(new Animated.Value(0)).current;

  const animateIcon = (animation: Animated.Value, direction: 'up' | 'down') => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: direction === 'up' ? -10 : 10,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start();
  };

  const updatePost = async (type: 'upvote' | 'downvote') => {
    let payload = {};

    if (type === 'upvote') {
      payload = {
        upvotes: item.is_upvoted ? item.upvotes - 1 : item.upvotes + 1,
        is_upvoted: !item.is_upvoted,
        downvotes: item.is_downvoted ? item.downvotes - 1 : item.downvotes,
        is_downvoted: false,
      };
      animateIcon(upvoteAnim, 'up');
    } else {
      payload = {
        downvotes: item.downvotes + 1,
        upvotes: item.is_upvoted ? item.upvotes - 1 : item.upvotes,
        is_downvoted: !item.is_downvoted,
        is_upvoted: false,
      };
      animateIcon(downvoteAnim, 'down');
    }

    try {
      await update('Post', item.id, payload);
      setUpdated();
    } catch (_err) {
    } finally {
      setUpdated();
    }
  };

  const hashtag = `# ${item.hashtags.split('#')[1]}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UserProfile avatarUri={item.avatar} username={item.username} createdAt={item.created_at} />

        <Dropdown options={options} isScrolling={isScrolling} onSelect={() => {}} position="top">
          <SimpleLineIcons name="options" size={16} color="white" />
        </Dropdown>
      </View>

      <View style={{ zIndex: -1 }}>
        <View style={styles.titleContainer}>
          <Text size={16} textAlign="left">
            {item.title}
          </Text>
        </View>

        <Image type="post" source={{ uri: item.media }} />
      </View>

      <View style={styles.actionsContainer}>
        <Button
          title="Sawer"
          icon={<Icons iconType="MaterialIcons" name="hand-coin-outline" size={16} />}
          theme="default"
          bgColor="rgb(221, 149, 42)"
          style={[styles.button, { width: 85 }]}
        />

        <Button
          title={hashtag}
          theme="transparent"
          bgColor="blue"
          style={[styles.button, { flex: 1, maxWidth: hashtagsButtonWidth(item.hashtags) }]}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <View style={styles.votingContainer}>
            <Button
              textStyle={styles.voteText}
              title={`${item.upvotes || 'vote'}`}
              onPress={() => updatePost('upvote')}
              icon={
                <Animated.View style={{ transform: [{ translateY: upvoteAnim }] }}>
                  <Icons name="arrow-up-outline" size={20} />
                </Animated.View>
              }
              style={[styles.voteUpButton, item.is_upvoted && { backgroundColor: Colors.primary }]}
            />

            <Button
              textStyle={styles.voteText}
              onPress={() => updatePost('downvote')}
              style={[
                styles.voteDownButton,
                item.is_downvoted && { backgroundColor: Colors.primary },
              ]}>
              <Animated.View style={{ transform: [{ translateY: downvoteAnim }] }}>
                <Icons name="arrow-down-outline" size={20} />
              </Animated.View>
            </Button>
          </View>

          <Button
            title="0"
            icon={<Icons size={20} iconType="MaterialIcons" name="comment-text-outline" />}
            textStyle={styles.commentText}
            style={styles.commentButton}
          />
        </View>

        <View style={styles.footerRight}>
          <Dropdown options={shareOptions} isScrolling={isScrolling} onSelect={() => {}}>
            <View
              style={{
                borderColor: 'rgb(65, 65, 65)',
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                width: '100%',
              }}>
              <Icons size={24} iconType="MaterialIcons" name="share-outline" />
            </View>
          </Dropdown>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12,
    paddingVertical: 16,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    zIndex: 1,
    paddingBottom: 8,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerLeft: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 20,
  },
  votingContainer: {
    flexDirection: 'row',
  },
  voteText: {
    fontSize: 16,
  },
  voteUpButton: {
    maxWidth: 73,
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgb(65, 65, 65)',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  voteDownButton: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(65, 65, 65)',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  commentButton: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(65, 65, 65)',
    width: 72,
    borderRadius: 8,
  },
  footerRight: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingRight: 10,
  },
  commentText: {
    fontSize: 16,
  },
});
