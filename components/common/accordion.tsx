import { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

import Icons from './icons';

import { Colors } from '@/constants/Colors';

interface Options {
  content: string;
  href: string;
  icon: string;
}

interface Props {
  options: Options[];
  title: string;
  visible: boolean;
  toggleVisible: () => void;
}

export default function AccordionItem({ options, title, visible, toggleVisible }: Props) {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: visible ? options.length * 40 + 10 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  const handleToggle = () => {
    toggleVisible();
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={handleToggle} style={styles.accordionHeader}>
        <Text style={styles.headerText}>{title}</Text>
        <Icons name={visible ? 'caret-up-outline' : 'caret-down-outline'} size={20} />
      </TouchableOpacity>
      <Animated.View style={[styles.accordionBody, { height: animatedHeight }]}>
        {options.map(option => (
          <TouchableOpacity
            key={option.content}
            onPress={() => console.log(option.content)}
            style={styles.contentContainer}>
            <Icons name={option.icon} size={20} />
            <Text style={styles.content}>{option.content}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    width: '100%',
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    gap: 10,
    paddingTop: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionBody: {
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 5,
    paddingHorizontal: 18,
  },
  content: {
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
});
