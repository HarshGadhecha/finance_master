import { Dimensions, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const TextInputBackground = '#f3f5fd';
export const ButtonColor ='#41d9a1'
// '#15c691';
export const HeadingColor = '#2571e7';
export const ML='ML';
export const MM='MM';
export const MR='MR';
export const MS='MS';

export const inputStyle = StyleSheet.create({
  fullTextInput: { borderRadius: 15, fontSize: 16, borderWidth: 1, width: width - 40, padding: 10, height: 45,fontFamily:MM },
  halfTextInput: { borderRadius: 15, fontSize: 16, borderWidth: 1, width: width / 2 - 25, padding: 10, height: 45,fontFamily:MM },
  textInputBackground: { backgroundColor: TextInputBackground, borderColor: TextInputBackground },
  result: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginVertical: 3 },
  shadowBox: {
    shadowColor: TextInputBackground,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})


export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
