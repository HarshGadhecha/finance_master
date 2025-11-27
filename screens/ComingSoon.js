import React from 'react';
import { View, Text, SafeAreaView, useColorScheme, Platform, Image } from 'react-native';
import { BackButton } from '../constants/ReUsableComponents';
import { MM, MS, height, width } from '../constants/Layout';
import Colors from '../constants/Colors';

export const ComingSoon = ({ route }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    const calculatorName = route?.params?.name || 'This Calculator';

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
            <View style={{ paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 0 : 20 }}>
                <BackButton />
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>
                <Image
                    source={require('../assets/images/extra/soon.png')}
                    style={{ width: width / 1.5, height: height * 0.40 }}
                />
                <Text style={{
                    fontSize: 24,
                    fontFamily: MM,
                    marginBottom: 10,
                    color: themeColors.text,
                    textAlign: 'center'
                }}>
                    Coming Soon!
                </Text>
                <Text style={{
                    marginVertical: 25,
                    fontSize: 16,
                    fontFamily: MS,
                    textAlign: 'center',
                    color: themeColors.textSecondary,
                    lineHeight: 24
                }}>
                    {calculatorName} is under development and will be available in the next update. Stay tuned!
                </Text>
            </View>
        </SafeAreaView>
    );
}