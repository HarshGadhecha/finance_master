import React from 'react';
import { View, Platform, useColorScheme } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Colors from '../constants/Colors';
import HapticFeedback from 'react-native-haptic-feedback';
import { feedbackOptions } from '../constants/ReUsableComponents';
import { ML, MR, MS } from '../constants/Layout';

export const SegmentControl = ({ values, selectedIndex, onChange }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const handleChange = (event) => {
    const index = event.nativeEvent.selectedSegmentIndex;
    HapticFeedback.trigger('impactLight', feedbackOptions);
    onChange(index);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <SegmentedControl
        values={values}
        selectedIndex={selectedIndex}
        onChange={handleChange}
        style={{
          height: 40,
        }}
        // iOS specific styles
        activeFontStyle={{
          fontSize: 12,
          fontFamily:MS,
          color: themeColors.text
        }}
        fontStyle={{
          fontSize: 12,
          fontFamily:ML,
        }}
        tintColor={themeColors.primary}
        // backgroundColor={themeColors.cardBackground}
        // Android specific styles
        appearance={colorScheme === 'dark' ? 'dark' : 'light'}
      />
    </View>
  );
};

export default SegmentControl;
