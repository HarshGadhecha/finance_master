import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, Button, Keyboard, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { ButtonColor, HeadingColor, height, inputStyle, TextInputBackground, width } from '../../constants/Layout';
import { BackButton, Bold, CalculateButton, entering, exiting, InputInterest, InputPrincipal, InterestText, MixText, PieChartComponent, PieText, ResetButton, SimpleText, TextInputTitle, TextInputTitleResult, YearText } from '../../constants/ReUsableComponents';
import { ComingSoon } from '../ComingSoon';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, ShowInterstitial, ShowRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import { StatusBar } from 'expo-status-bar';

export const NPV = ({ navigation }) => {
  LoadInterstitial();
  LoadRewardedInterstitial();
  const [rate, setRate] = useState('');
  const [periods, setPeriods] = useState('');
  const [cashflows, setCashflows] = useState('');
  const [result, setResult] = useState('');

  const handleReset = () => {
    setRate('');
    setPeriods('');
    setCashflows('');
    setResult('');
    // ShowInterstitial();
  };


  const handleCalculate = () => {
    if (rate && periods && cashflows) {
      const rateDecimal = parseFloat(rate) / 100;
      const periodsArray = periods.split(',').map(period => parseFloat(period.trim()));
      const cashflowsArray = cashflows.split(',').map(cashflow => parseFloat(cashflow.trim()));

      const npv = cashflowsArray.reduce((sum, cashflow, index) => {
        // ShowInterstitial();
      }, 0);

      setResult(npv.toFixed(2));
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>

      <StatusBar style='dark' />
      <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <View style={{ flex: 1 }}>
            <BackButton />
            <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>Net Present Value Calculation : </Text>

            <ComingSoon />
            {/* <View style={{ flexDirection: 'row' }}>

            <View style={{ marginRight: 10 }}>
              <InputInterest text={'DISCOUNTED RATE (%)'} value={rate} onChangeText={(text) => { setResult(''); setRate(text) }} />
            </View>

            <InputInterest text={'PERIODS'} value={periods} onChangeText={(text) => { setResult(''); setPeriods(text) }} />
          </View>
           {cashflows.map((cashFlow, cashFlowIndex) => (
            <InputPrincipal key={cashFlowIndex} text={'CASH FLOWS'} value={cashflows} onChangeText={(text) => { setResult(''); setCashflows(text) }} />

          ))} 
          <Button title="Add cash flow" onPress={handleAddCashFlow} />
          
          <InputPrincipal text={'CASH FLOWS'} value={cashflows} onChangeText={(text) => { setResult(''); setCashflows(text) }} />
          <CalculateButton onPress={handleCalculate} />

          <View>
            {result.length > 0 ?
              <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                <View style={{ padding: 5 }}>
                  <Text style={{ color: HeadingColor, fontSize: 16, marginVertical: 5, fontWeight: 'bold', marginBottom: 10, marginHorizontal: 10 }}>CALCULATION</Text>

                  {/* <PieChartComponent data={pieData} value={result} />
                 <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>
                                   
                  <SimpleText text={'PRINCIPAL AMOUNT : '} value={principal} background={true} />
                  <InterestText text={'INTEREST RATE : '} value={rate}  background={true}/>
                  <YearText text={'YEARS :'} value={years}  background={true}/>
                  <SimpleText text={'TOTAL INTEREST :'} value={result} background={true}/>
                  <SimpleText text={'MATURITY AMOUNT :'} value={endBalance}  background={true}/> 
                </View>
                  <Text>NPV: {result}</Text>
                  <ResetButton onPress={handleReset} />
                </View>
              </Animated.View> :
              null
            }
          </View> */}
            <View style={{ height: 120 }} />
          </View>
        </TouchableWithoutFeedback >
      </ScrollView>
      <AdBanner />
    </SafeAreaView >
  );
}
