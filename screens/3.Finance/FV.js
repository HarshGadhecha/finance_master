import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, Button, Keyboard, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { ButtonColor, HeadingColor, height, inputStyle, TextInputBackground, width } from '../../constants/Layout';
import { BackButton, Bold, CalculateButton, CalculationText, entering, exiting, InputInterest, InputPrincipal, InterestText, MixText, PieChartComponent, PieText, ResetButton, SimpleText, TextInputTitle, TextInputTitleResult, YearText } from '../../constants/ReUsableComponents';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, ShowInterstitial, ShowRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import { StatusBar } from 'expo-status-bar';

export const FV = ({ navigation }) => {
  LoadInterstitial();
  LoadRewardedInterstitial();
  const [presentValue, setPresentValue] = useState();
  const [futureValue, setFutureValue] = useState();
  const [interestRate, setInterestRate] = useState();
  const [years, setYears] = useState();

  const handleReset = () => {
    setPresentValue();
    setInterestRate();
    setYears();
    setFutureValue();
    // ShowInterstitial();
  };

  const handleCalculate = () => {
    if (presentValue && interestRate && years) {
      const pv = parseFloat(presentValue);
      const ir = parseFloat(interestRate) / 100;
      const n = parseFloat(years);
      const fv = pv * Math.pow(1 + ir, n);
      setFutureValue(fv.toFixed(2));
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
            <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>Future Value Calculation : </Text>

            <InputPrincipal text={'PRESENT VALUE'} value={presentValue} onChangeText={(text) => { setFutureValue(); setPresentValue(text) }} />

            <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
              <View style={{ marginRight: 10 }}>
                <InputInterest text={'INTEREST RATE (%)'} value={interestRate} onChangeText={(text) => { setFutureValue(); setInterestRate(text) }} />
              </View>
              <View>
                <InputInterest text={'YEARS :'} value={years} onChangeText={(text) => { setFutureValue(); setYears(text) }} />
              </View>
            </View>

            <CalculateButton onPress={handleCalculate} />

            <View>
              {futureValue > 0 && (
                <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                  <View style={{ padding: 5 }}>
                    <CalculationText />
                    <PieChart principal={presentValue} interest={futureValue - presentValue} data1={'Present Value'} data2={'Future Value'} />
                    <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>

                      <SimpleText text={'PRESENT VALUE : '} value={presentValue} />
                      <InterestText text={'INTEREST RATE : '} value={interestRate} />
                      <YearText text={'YEARs : '} value={years} />
                      <SimpleText text={'FUTURE VALUE : '} value={futureValue} />
                    </View>
                    <ResetButton onPress={handleReset} />
                  </View>
                </Animated.View>
              )}
            </View>
            <View style={{ height: 120 }} />
          </View>
        </TouchableWithoutFeedback >
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}
