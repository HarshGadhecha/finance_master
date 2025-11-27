import React, { useState } from 'react';
import { ScrollView, View, Button, Text, TextInput, TouchableWithoutFeedback, FlatList, Keyboard, TouchableOpacity, useColorScheme } from 'react-native';
import { ButtonColor, HeadingColor, height, inputStyle, TextInputBackground, width } from '../../constants/Layout';
import { BackButton, CalculateButton, entering, exiting, InputPrincipal, InterestText, PieChartComponent, PieText, ResetButton, ScreenTitle, SimpleText, TextInputTitle, TextInputTitleResult, YearText } from '../../constants/ReUsableComponents';
import Animated from 'react-native-reanimated';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, ShowInterstitial, ShowRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';

export const LoanToValueRatio = () => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    LoadInterstitial();
    LoadRewardedInterstitial();

    const [loanAmount, setLoanAmount] = useState();
    const [propertyValue, setPropertyValue] = useState();
    const [loanToValueRatio, setLoanToValueRatio] = useState();

    const handleReset = () => {
        setPropertyValue();
        setLoanAmount();
        setLoanToValueRatio();
        // ShowInterstitial();
    };
    const handleCalculate = () => {
        if (propertyValue && loanAmount) {
            const loanAmountFloat = parseFloat(loanAmount);
            const propertyValueFloat = parseFloat(propertyValue);

            // Calculate loan-to-value ratio
            const loanToValueRatio = (loanAmountFloat / propertyValueFloat) * 100;

            setLoanToValueRatio(loanToValueRatio.toFixed(2));
            // ShowInterstitial();
        }
        else {
            alert('Please Fill Out All Fields');
        }
    };

    return (
        <View style={{ backgroundColor: themeColors.background, flex: 1 }}>
             
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
                    <BackButton />
                    <ScreenTitle title={'Loan To Value Ratio Calculation'} />
                    <InputPrincipal text={'PROPERTY VALUE'} value={propertyValue} label={'100000'} onChangeText={(text) => { setLoanToValueRatio(''); setPropertyValue(text) }} />
                    <InputPrincipal text={'LOAN AMOUNT'} value={loanAmount} label={'50000'} onChangeText={(text) => { setLoanToValueRatio(''); setLoanAmount(text) }} />

                    <CalculateButton onPress={() => handleCalculate()} />

                    {loanToValueRatio && (

                        <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                            <View style={{ padding: 5 }}>
                                <Text style={{ color: HeadingColor, fontSize: 16, marginVertical: 5, fontWeight: 'bold', marginBottom: 10, marginHorizontal: 10 }}>CALCULATION</Text>
                                <PieChart principal={propertyValue} interest={loanAmount} data1={'Propery Value'} data2={'Loan Amount'} />
                                <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>

                                    <InterestText text={'L-T-V RATIO : '} value={loanToValueRatio} background={true} />
                                    <SimpleText text={'PROPERTY VALUE : '} value={propertyValue} background={false} />
                                    <SimpleText text={'LOAN AMOUNT :'} value={loanAmount} background={true} />
                                    <SimpleText text={'DEPOSITE AMOUNT :'} value={(propertyValue - loanAmount).toFixed(0)} background={false} />
                                </View>
                                <ResetButton onPress={handleReset} />
                            </View>

                        </Animated.View>
                    )}
                    <View style={{ height: 120 }} />
                </ScrollView>
            </TouchableWithoutFeedback>
            <AdBanner />
        </View>
    )
}