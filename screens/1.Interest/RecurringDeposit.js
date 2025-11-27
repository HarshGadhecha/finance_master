import React, { useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView, useColorScheme } from 'react-native';
import Animated from 'react-native-reanimated';
import { HeadingColor, height, MM, TextInputBackground } from '../../constants/Layout';
import { BackButton, CalculateButton, CalculationText, entering, exiting, InputInterest, InputPrincipal, InterestText, PieChartComponent, ResetButton, ScreenTitle, SimpleText, YearText } from '../../constants/ReUsableComponents';
import { LoadInterstitial, LoadRewardedInterstitial, interstitial, rewardedInterstitial, AdBanner, ShowRewardedInterstitial, ShowInterstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';

export const RecurringDeposit = () => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    LoadInterstitial();
    LoadRewardedInterstitial();

   // const [principal, setPrincipal] = useState('');
    const [interestRate, setInterestRate] = useState();
    const [years, setYears] = useState();
    const [monthlyDeposit, setMonthlyDeposit] = useState();
    const [maturityValue, setMaturityValue] = useState();
    const [totalInvestment, setTotalInvestment] = useState();
    const [totalInterest, setTotalInterest] = useState();
    const [monthlyInterest, setMonthlyInterest] = useState();

    const handleReset = () => {
       // setPrincipal('');
        setInterestRate();
        setYears();
        setMonthlyDeposit();
        setMaturityValue();
        setTotalInterest();
        setTotalInvestment();
        // ShowInterstitial();
    };

    const handleCalculate = () => {
        if (interestRate && years && monthlyDeposit) {
           // const p = parseFloat(principal);
            const r = parseFloat(interestRate) / 1200;
            const n = parseFloat(years);
            const d = parseFloat(monthlyDeposit);

            let maturity = 0;
            let totalInterest = 0;
            let monthlyInterest = 0;

            for (let i = 0; i < n; i++) {
                monthlyInterest = ( maturity) * r;
                totalInterest += monthlyInterest;
                maturity += monthlyInterest + d;
            }

            setMaturityValue(maturity.toFixed(2));
            setMonthlyInterest(monthlyInterest.toFixed(2));
            setTotalInterest(totalInterest.toFixed(2));
            let a =years * monthlyDeposit;
            setTotalInvestment(a.toFixed(2));
            // ShowInterstitial();
        }
        else{
            alert('Please Fill Out All Fields');
          }
    }

    return (
        <View style={{ backgroundColor: themeColors.background, flex: 1 }}>
             

            <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={{ flex: 1 }}>
                        <BackButton />
                        <ScreenTitle title={'Recurring Deposit Calculation'} />
                        {/* <InputPrincipal text={'INITIAL AMOUNT'} value={principal} onChangeText={(text) => { setTotalInterest(''); setPrincipal(text) }} /> */}
                        <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
                            <View style={{ marginRight: 10 }}>
                                <InputInterest text={'INTEREST RATE (APR %)'} value={interestRate} onChangeText={(text) => { setTotalInterest(''); setInterestRate(text) }} />
                            </View>
                            <View>
                                <InputInterest text={'MONTH'} value={years} onChangeText={(text) => { setTotalInterest(''); setYears(text); if (text.length == 4) Keyboard.dismiss() }} />
                            </View>
                        </View>
                        <InputPrincipal text={'MONTHLY DEPOSIT'} value={monthlyDeposit} onChangeText={(text) => { setTotalInterest(''); setMonthlyDeposit(text) }} />
                        <CalculateButton onPress={handleCalculate} />
                        {totalInterest > 0 && (
                            <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                                <View style={{ padding: 5 }}>
                                    <CalculationText />
                                    <PieChart principal={totalInvestment} interest={totalInterest} />
                                    <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>
                                        {/* <SimpleText text={'PRINCIPAL AMOUNT : '} value={principal} /> */}
                                        <InterestText text={'INTEREST RATE : '} value={interestRate} />
                                        <YearText text={'MONTHS :'} value={years} />
                                        <SimpleText text={'MONTHLY DEPOSIT :'} value={monthlyDeposit} />
                                        <SimpleText text={'TOTAL INVESTMENT :'} value={totalInvestment} />
                                        <SimpleText text={'TOTAL INTEREST :'} value={totalInterest} />
                                        <SimpleText text={'MATURITY AMOUNT :'} value={maturityValue} />
                                    </View>
                                    <ResetButton onPress={handleReset} />
                                </View>
                            </Animated.View>)
                        }
                         <View style={{ height: 120}} />
                    </View>

                </TouchableWithoutFeedback>
            </ScrollView>
            <AdBanner />
        </View>
    );
}
