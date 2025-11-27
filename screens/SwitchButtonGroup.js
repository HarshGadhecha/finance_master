import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { MS, width } from '../constants/Layout';
import { useAnimatedStyle, withSpring,useSharedValue, interpolate } from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';
import { feedbackOptions } from '../constants/ReUsableComponents';
import Colors from '../constants/Colors';


const SwitchButton = ({ option, activeOption, onPress, widthOption }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const isActive = option === activeOption;

  const scaleValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scaleValue.value, [0.9, 1], [0.8, 1]);
    const translateX = interpolate(scaleValue.value, [0.9, 1], [-5, 0]);
  
    return {
      transform: [{ scale }, { translateX }],
    };
  });
  const onPressIn = () => {
    scaleValue.value = withSpring(0.5);
      HapticFeedback.trigger('impactLight', feedbackOptions);
  };

  const onPressOut = () => {
    scaleValue.value = withSpring(1, { damping: 15, stiffness: 200 });
  };


  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress(option)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{
          backgroundColor: isActive ? themeColors.primary : themeColors.cardBackground,
          borderRadius: isActive ? 5 : 0, paddingVertical: 4,
          borderColor: isActive ? themeColors.primary : themeColors.cardBorder,
          borderWidth: 1,
          width: widthOption,
          marginVertical:5
        }}>
        <Text style={{
          color: isActive ? (colorScheme === 'dark' ? '#000' : '#fff') : themeColors.textSecondary,
          fontSize: 12,
          textAlign: 'center',
          fontFamily:MS,
          textTransform:'uppercase'
        }}>
          {option}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const SwitchButtonGroup = ({ options, activeOption, onChange,widthOption }) => {
  return (
    <View style={{ flexDirection: 'row'}}>
      {options.map((option) => (
        <SwitchButton
          key={option}
          option={option}
          activeOption={activeOption}
          onPress={onChange}
          widthOption={widthOption}
        />
      ))}
    </View>
  );
};
