import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, useColorScheme } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated from 'react-native-reanimated';
import { HeadingColor, height, inputStyle, MM, MS, TextInputBackground } from '../../constants/Layout';
import { BackButton, CalculateButton, CalculationText, entering, exiting, feedbackOptions, InputInterest, InputPrincipal, InterestText, PieChartComponent, ResetButton, ScreenTitle, SimpleText, TextInputTitle, YearText } from '../../constants/ReUsableComponents';
import { LoadInterstitial, LoadRewardedInterstitial, interstitial, rewardedInterstitial, AdBanner, ShowRewardedInterstitial, ShowInterstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import HapticFeedback from 'react-native-haptic-feedback';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';

export const CreditCardInterest = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  LoadInterstitial();
  LoadRewardedInterstitial();

  const [balance, setBalance] = useState();
  const [interestRate, setInterestRate] = useState();
  const [monthlyPayment, setMonthlyPayment] = useState();
  const [monthsToPayoff, setMonthsToPayoff] = useState();
  const [interest, setTotalInterest] = useState();
  const [useFixedMonthlyPayment, setUseFixedMonthlyPayment] = useState(false);
  const [result, setResult] = useState();

  const handleReset = () => {
    setBalance();
    setInterestRate();
    setMonthlyPayment();
    setMonthsToPayoff();
    setUseFixedMonthlyPayment(false);
    setResult();
    setTotalInterest();
    // ShowInterstitial();
  };

  const calculateInterest = () => {
    if (balance && interestRate && (monthlyPayment || monthsToPayoff)) {
      const balanceFloat = parseFloat(balance);
      const interestRateFloat = parseFloat(interestRate);
      const monthlyPaymentFloat = parseFloat(monthlyPayment);
      const monthsToPayoffFloat = parseFloat(monthsToPayoff);

      let remainingBalance = balanceFloat;
      let totalInterest = 0;
      let months = 0;

      if (!useFixedMonthlyPayment) {
        let monthlyInterestRate = interestRateFloat / 100 / 12;
        let monthlyPaymentFloat = remainingBalance * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -monthsToPayoffFloat));

        while (remainingBalance > 0 && months < monthsToPayoffFloat) {
          const monthlyInterest = remainingBalance * monthlyInterestRate;
          const monthlyPrincipal = monthlyPaymentFloat - monthlyInterest;

          remainingBalance -= monthlyPrincipal;
          totalInterest += monthlyInterest;
          months++;
        }
        setTotalInterest(parseInt(totalInterest));
        setResult(((balanceFloat + totalInterest) / monthsToPayoff).toFixed(2));
      } else {
        while (remainingBalance > 0) {
          const monthlyInterest = remainingBalance * (interestRateFloat / 100 / 12);
          const monthlyPrincipal = monthlyPaymentFloat - monthlyInterest;

          remainingBalance -= monthlyPrincipal;
          totalInterest += monthlyInterest;
          months++;
        }
        setTotalInterest(totalInterest.toFixed(2));
        setResult(months);
      }
      // ShowInterstitial();
    }
    else {
      alert('Please Fill Out All Fields');
    }
  }

  return (
    <View style={{ backgroundColor: themeColors.background, flex: 1 }}>
      <StatusBar style='dark' />

      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
          <View>
            <BackButton />
            <ScreenTitle title={'Credit Card Interest Calculation'} />
            <InputPrincipal text={'BALANCE OWNED :'} value={balance} onChangeText={(text) => { setResult(''); setBalance(text) }} />

            <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
              <InputInterest text={'INTEREST RATE (APR %)'} value={interestRate} onChangeText={(text) => { setResult(''); setInterestRate(text) }} />
            </View>
            {useFixedMonthlyPayment ? (
              <InputPrincipal text={'DESIRED MONTHLY PAYMENT :'} value={monthlyPayment} onChangeText={(text) => { setResult(''); setMonthlyPayment(text) }} />
            ) : (
              <View>
                <TextInputTitle text={'DESIRED MONTH TO PAY OFF :'} />
                <TextInput
                  placeholder={'2.75'}
                  placeholderTextColor={'lightgrey'}
                  maxLength={4}
                  keyboardType={'decimal-pad'}
                  value={monthsToPayoff}
                  style={{ ...inputStyle.fullTextInput, ...inputStyle.textInputBackground }}
                  onChangeText={(text) => { setResult(''); setMonthsToPayoff(text); if (text.length == 3) Keyboard.dismiss() }}
                />
              </View>
            )}
            <BouncyCheckbox style={styles.checkboxContainer}
              size={25}
              fillColor={HeadingColor}
              unfillColor="#FFFFFF"
              text="Use Monthly Payment"
              textStyle={{ fontSize: 14, textDecorationLine: "none", fontFamily: MM }}
              iconStyle={{ borderColor: HeadingColor }}
              innerIconStyle={{ borderWidth: 2 }}
              isChecked={useFixedMonthlyPayment}
              onPress={() => {
                setResult('');
                setUseFixedMonthlyPayment(!useFixedMonthlyPayment);
                HapticFeedback.trigger('impactLight', feedbackOptions);
              }} />

            <CalculateButton onPress={calculateInterest} />

            {result > 0 && (
              <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                <View style={{ padding: 5 }}>
                  <CalculationText />
                  <PieChart principal={balance} interest={interest} data1={'Balance'} />

                  <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>

                    <SimpleText text={'BALANCE OWNED : '} value={balance} />
                    <InterestText text={'INTEREST RATE : '} value={interestRate} />
                    {useFixedMonthlyPayment ?
                      (<>
                        <SimpleText text={'MONTHLY PAYMENT :'} value={monthlyPayment} />
                        <YearText text={'MONTHS TO PAY OFF :'} value={'' + result + ''} />
                      </>
                      )
                      :
                      (
                        <>
                          <YearText text={'MONTHS TO PAY OFF :'} value={monthsToPayoff} />
                          <SimpleText text={'MONTHLY PAYMENT :'} value={result} />
                        </>
                      )
                    }

                    <SimpleText text={'TOTAL INTEREST :'} value={parseFloat(interest).toFixed(2)} />
                    <SimpleText text={'TOTAL Payoff :'} value={(parseFloat(balance) + parseFloat(interest)).toFixed(2)} />

                  </View>
                  <ResetButton onPress={handleReset} />
                </View>
              </Animated.View>
            )}

            <View style={{ height: 120 }} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <AdBanner />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    width: '100%',
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: 'row', alignItems: 'center',
    marginVertical: 10
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    marginTop: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
