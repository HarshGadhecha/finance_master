import React, { useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, useColorScheme } from 'react-native';
import { ButtonColor, HeadingColor, height, inputStyle, TextInputBackground, width } from '../../constants/Layout';
import { BackButton, Bold, CalculateButton, entering, exiting, InputInterest, InputPrincipal, InterestText, PieChartComponent, PieText, ResetButton, SimpleText, TextInputTitle, TextInputTitleResult } from '../../constants/ReUsableComponents'
import Animated from 'react-native-reanimated';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, ShowInterstitial, ShowRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';

export const LoanCalculator = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  LoadInterstitial();
  LoadRewardedInterstitial();

  const [loanAmount, setLoanAmount] = useState();
  const [interestRate, setInterestRate] = useState();
  const [loanTerm, setLoanTerm] = useState();
  const [monthlyPayment, setMonthlyPayment] = useState();

  const calculateLoan = () => {
    if (loanAmount && interestRate && loanTerm) {
      const interest = Number(interestRate.replace(/[,|.]/g, '.')) / 1200;
      const termInMonths = Number(loanTerm.replace(/[,|.]/g, '.')) * 12;
      const monthlyPayment =
        (loanAmount * interest) /
        (1 - Math.pow(1 / (1 + interest), termInMonths));
      setMonthlyPayment(monthlyPayment.toFixed(2));
      // ShowInterstitial();
    }
    else{
      alert('Please Fill Out All Fields');
    }
  };

  const handleReset = () => {
    setLoanAmount();
    setInterestRate();
    setLoanTerm();
    setMonthlyPayment();
    // ShowInterstitial();
  };

  return (
    <View style={{ backgroundColor: themeColors.background, flex: 1 }}>
      <StatusBar style='dark' />
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
          <View>
            <BackButton />
            <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>Loan Calculation : </Text>

            <InputPrincipal text={'LOAN AMOUNT'} value={loanAmount} onChangeText={(text) => { setMonthlyPayment(); setLoanAmount(text) }} />

            <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
              <View style={{ marginRight: 10 }}>
                <InputInterest text={'INTEREST RATE (%)'} value={interestRate} onChangeText={(text) => { setMonthlyPayment(); setInterestRate(text) }} />
              </View>
              <View>
                <InputInterest text={'LOAN TERM (Year)'} value={loanTerm} onChangeText={(text) => { setMonthlyPayment(); setLoanTerm(text); if (text.length == 4) Keyboard.dismiss() }} />
              </View>
            </View>

            <CalculateButton onPress={calculateLoan} />

            {monthlyPayment > 0 ? (

              <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                <View style={{ padding: 5 }}>
                  <Text style={{ color: HeadingColor, fontSize: 16, marginVertical: 5, fontWeight: 'bold', marginBottom: 10, marginHorizontal: 10 }}>CALCULATION</Text>

                  <PieChart principal={loanAmount} interest={monthlyPayment * loanTerm.replace(/[,|.]/g, '.') * 12 - loanAmount} data1={'Loan Amount'} />
                  <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>

                    <SimpleText text={'LOAN AMOUNT : '} value={loanAmount} background={true} />
                    <InterestText text={'INTEREST RATE : '} value={interestRate} background={false} />
                    <SimpleText text={'MONTHLY PAYMENT :'} value={monthlyPayment} background={true} />
                    <SimpleText text={'ANNUAL PAYMENT :'} value={(monthlyPayment * 12).toFixed(2)} background={false} />
                    <SimpleText text={'TOTAL INTEREST  :'} value={((monthlyPayment * loanTerm.replace(/[,|.]/g, '.') * 12 - loanAmount)).toFixed(2)} background={true} />
                    <SimpleText text={'TOTAL PAY OFF :'} value={(monthlyPayment * loanTerm.replace(/[,|.]/g, '.') * 12).toFixed(2)} background={false} />
                  </View>
                  <ResetButton onPress={handleReset} />
                </View>
              </Animated.View>

            ) : null}
             <View style={{ height: 120}} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <AdBanner />
    </View>
  );
};

