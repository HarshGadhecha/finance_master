import React, { useState } from 'react';
import { Text, ScrollView, Keyboard, TouchableWithoutFeedback, StyleSheet, View, useColorScheme } from 'react-native';
import Animated from 'react-native-reanimated';
import { HeadingColor, height, TextInputBackground } from '../../constants/Layout';
import { BackButton, CalculateButton, CalculationText, DecimalIn2, entering, exiting, InputPrincipal, PieChartComponent, ResetButton, ScreenTitle, SimpleText, YearText } from '../../constants/ReUsableComponents';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, ShowInterstitial, ShowRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';

export const DTI = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    LoadInterstitial();
    LoadRewardedInterstitial();

    const [monthlyDebt, setMonthlyDebt] = useState();
    const [grossIncome, setGrossIncome] = useState();
    const [dtiRatio, setDtiRatio] = useState();

    const handleReset = () => {
        setMonthlyDebt();
        setGrossIncome();
        setDtiRatio();
        // ShowInterstitial();
    };
    const calculateDtiRatio = () => {
        if (monthlyDebt  && grossIncome ) {
            const dti = (parseInt(monthlyDebt) / parseInt(grossIncome)) * 100;
            setDtiRatio(dti);
            // ShowInterstitial();
        }
        else{
            alert('Please Fill Out All Fields');
          }
    };

    return (
        <View style={{ backgroundColor: themeColors.background, flex: 1 }}>
      <StatusBar style='dark' />
            <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={{ flex: 1 }}>
                        <BackButton />
                        <ScreenTitle title={'Debt To Income Ratio Calculation'} />
                        <InputPrincipal text={'Monthly debt'} value={monthlyDebt} onChangeText={(text) => { setDtiRatio(); setMonthlyDebt(text) }} />
                        <InputPrincipal text={'Gross monthly income'} value={grossIncome} onChangeText={(text) => { setDtiRatio(); setGrossIncome(text) }} />

                        <CalculateButton onPress={calculateDtiRatio} />
                        {dtiRatio > 0 && (
                            <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                                <View style={{ padding: 5 }}>
                                  <CalculationText/>
                                  <PieChart principal={grossIncome} interest={-monthlyDebt} data1={'Gross Income'} data2={'Monthly Debt'}/>
                                    <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>

                                        <YearText text={'D-T-I RATIO IS : '} value={DecimalIn2(dtiRatio) + ' %'} background={true} />
                                        <SimpleText text={'MONTHLY DEBT : '} value={monthlyDebt} background={false} />
                                        <SimpleText text={'GROSS MONTHLY\nINCOME :'} value={grossIncome} background={true} />
                                    </View>
                                    <ResetButton onPress={handleReset} />
                                </View>
                            </Animated.View>

                        )}
                         <View style={{ height: 120}} />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <AdBanner />
        </View>
    );
}
