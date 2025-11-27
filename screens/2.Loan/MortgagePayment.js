import React, { useState } from 'react';
import { View, TextInput, Text, Button, SafeAreaView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { ButtonColor, HeadingColor, height, inputStyle, TextInputBackground, width } from '../../constants/Layout';
import { BackButton, Bold, CalculateButton, entering, exiting, InputInterest, InputPrincipal, InterestText, PieChartComponent, PieText, ResetButton, ScreenTitle, SimpleText, TextInputTitle, TextInputTitleResult, YearText } from '../../constants/ReUsableComponents'
import Animated from 'react-native-reanimated';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, ShowInterstitial, ShowRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import { StatusBar } from 'expo-status-bar';

export const MortgagePayment = () => {
    LoadInterstitial();
    LoadRewardedInterstitial();

    const [loanAmount, setLoanAmount] = useState();
    const [interestRate, setInterestRate] = useState();
    const [loanTerm, setLoanTerm] = useState();
    const [result, setResult] = useState();

    const handleReset = () => {
        setLoanAmount();
        setInterestRate();
        setLoanTerm();
        setResult();
        // ShowInterstitial();
    };
    const handleCalculate = () => {
        if (loanAmount && loanTerm && interestRate) {
            const monthlyInterestRate = Number(interestRate.replace(/[,|.]/g, '.')) / 1200;
            const totalPayments = Number(loanTerm.replace(/[,|.]/g, '.')) * 12;
            const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
            const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
            const monthlyPayment = (Number(loanAmount.replace(/[,|.]/g, '.')) * (numerator / denominator)).toFixed(2);
            setResult(monthlyPayment);
            // ShowInterstitial();
        }
        else {
            alert('Please Fill Out All Fields');
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar style='dark' />
            <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={{ flex: 1 }}>
                        <BackButton />
                        <ScreenTitle title={'Mortgage Payment Calculation'} />
                        <InputPrincipal text={'LOAN AMOUNT'} value={loanAmount} onChangeText={(text) => { setResult(); setLoanAmount(text) }} />

                        <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
                            <View style={{ marginRight: 10 }}>
                                <InputInterest text={'INTEREST RATE (%)'} value={interestRate} onChangeText={(text) => { setResult(); setInterestRate(text) }} />
                            </View>
                            <View>
                                <InputInterest text={'LOAN TERM (Year)'} value={loanTerm} onChangeText={(text) => { setResult(); setLoanTerm(text); if (text.length == 4) Keyboard.dismiss() }} />
                            </View>
                        </View>

                        <CalculateButton onPress={handleCalculate} />

                        {result > 0 && (

                            <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                                <View style={{ padding: 5 }}>
                                    <Text style={{ color: HeadingColor, fontSize: 16, marginVertical: 5, fontWeight: 'bold', marginBottom: 10, marginHorizontal: 10 }}>CALCULATION</Text>
                                    <PieChart principal={loanAmount} interest={(result * 12 * loanTerm.replace(/[,|.]/g, '.')) - loanAmount} data1={'Loan Amount'} data2={'Interest'} />
                                    <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>
                                        <SimpleText text={'LOAN AMOUNT : '} value={loanAmount} background={true} />
                                        <InterestText text={'INTEREST RATE : '} value={interestRate} background={false} />
                                        <SimpleText text={'MONTHLY PAYMENT :'} value={result} background={true} />
                                    </View>
                                    <ResetButton onPress={handleReset} />

                                </View>
                            </Animated.View>
                        )}
                        <View style={{ height: 120 }} />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <AdBanner />
        </SafeAreaView>

    )
}