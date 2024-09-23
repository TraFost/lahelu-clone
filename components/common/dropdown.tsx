import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, Animated, StyleSheet, Easing, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface Options {
  label: string;
  icon: React.ReactNode;
  href?: string;
  color?: string;
}

type DropdownProps = {
  children: React.ReactNode;
  options: Options[];
  onSelect: (_option: string) => void;
  isScrolling?: boolean;
  position?: 'top' | 'bottom';
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  isScrolling,
  children,
  position = 'bottom',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, [isOpen]);

  useEffect(() => {
    if (!isScrolling) setIsOpen(false);
  }, [isScrolling]);

  const dropdownStyle = [
    styles.dropdown,
    { opacity: fadeAnim },
    position === 'top' && styles.positionTop,
  ];

  return (
    <>
      <TouchableOpacity onPress={toggleDropdown}>{children}</TouchableOpacity>

      {isOpen && (
        <Animated.View style={dropdownStyle}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleSelect(option.label)}>
              {option.icon}
              <Text style={[styles.optionText, { color: option.color ?? '#E4E4E4' }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    backgroundColor: 'rgb(26, 26, 26)',
    borderRadius: 8,
    elevation: 3,
    zIndex: 1000,
    position: 'absolute',
    bottom: 0,
    transform: [{ translateY: -55 }, { translateX: -20 }],
    width: width - 40,
    borderWidth: 1,
    borderColor: 'rgb(65, 65, 65)',
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  positionTop: {
    right: 0,
    bottom: 0,
    transform: [{ translateY: 165 }, { translateX: -30 }],
    zIndex: 99999,
    width: width - 70,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  option: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#E4E4E4',
  },
});
