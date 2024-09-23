import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamsList } from '@/types/router';

type NavigationProp = NativeStackNavigationProp<RootStackParamsList, keyof RootStackParamsList>;

export default function useNavigate() {
  const navigation = useNavigation<NavigationProp>();

  const push = (screen: keyof RootStackParamsList, params?: any) => {
    navigation.push(screen, params);
  };

  const replace = (screen: keyof RootStackParamsList, params?: any) => {
    navigation.replace(screen, params);
  };

  return { push, replace };
}
