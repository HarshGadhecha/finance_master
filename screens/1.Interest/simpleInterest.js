import { Entypo } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput, ScrollView, useColorScheme } from 'react-native';
import Animated from 'react-native-reanimated';
import { HeadingColor, height, inputStyle, MM, MS, TextInputBackground, width } from '../../constants/Layout';
import { BackButton, CalculateButton, CalculationText, entering, exiting, formatNumber, InputInterest, InputPrincipal, InterestText, ResetButton, ScreenTitle, selectedCurrencyIndex, SimpleText, TextInputTitle, TextInputTitleResult, YearText } from '../../constants/ReUsableComponents';
import { SwitchButtonGroup } from '../SwitchButtonGroup';
import { LoadInterstitial, LoadRewardedInterstitial, AdBanner, ShowRewardedInterstitial, ShowInterstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';

export const SimpleInterest = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  LoadInterstitial();
  LoadRewardedInterstitial();

  const options = ['YEAR', 'MONTH'];

  const [principal, setPrincipal] = useState();
  const [rate, setRate] = useState();
  const [date, setDate] = useState(options[0]);
  const [years, setYears] = useState();
  const [result, setResult] = useState();
  const [endBalance, setEndBalance] = useState();

  const handleReset = () => {
    setPrincipal();
    setRate();
    setDate(options[0]);
    setYears();
    setEndBalance();
    setResult([]);
    // ShowInterstitial();
  };

  const handleCalculate = () => {
    if (principal && rate && years) {
      let interest = 0;

      const months = () => {
        let a = parseFloat(years.replace(/[,|.]/g, '.')) / 12;
        return a;
      }
      const p = parseFloat(principal);
      const r = parseFloat(rate.replace(/[,|.]/g, '.'));
      const y = date === 'MONTH' ? months() : parseFloat(years.replace(/[,|.]/g, '.'));

      interest = (p * r * y) / 100;
      setResult(formatNumber(interest));
      let a = formatNumber(parseFloat(principal) + parseFloat(interest));
      setEndBalance(a);
      // ShowInterstitial();

    }
    else {
      alert('Please Fill Out All Fields');
    }
  }
  const handleOptionChange = (option) => {
    setDate(option);
    setResult();
  };

  return (
    <View style={{ backgroundColor: themeColors.background, flex: 1 }}>
      <StatusBar style='dark' />
      <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <View style={{ flex: 1 }}>
            <BackButton />
            <ScreenTitle title={'Simple Interest Calculation'} />

            <InputPrincipal text={'PRINCIPAL AMOUNT'} value={principal} onChangeText={(text) => { setResult(); setPrincipal(text) }} />

            <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
              <View style={{ marginRight: 10 }}>
                <InputInterest text={'INTEREST RATE (APR %)'} value={rate} onChangeText={(text) => { setResult(); setRate(text) }} />
              </View>
              <View>
                <View style={{}}>
                  <SwitchButtonGroup
                    options={options}
                    activeOption={date}
                    onChange={handleOptionChange}
                    widthOption={width / 5 - 10}
                  />
                </View>
                <TextInput
                  placeholderTextColor={'lightgrey'}
                  placeholder={date === 'MONTH' ? '33' : '2.75'}
                  maxLength={date === 'MONTH' ? 3 : 4}
                  keyboardType={'decimal-pad'}
                  value={years}
                  style={{ ...inputStyle.halfTextInput, ...inputStyle.textInputBackground }}
                  onChangeText={(text) => { setResult(); setYears(text); if (text.length == 4) Keyboard.dismiss() }}
                />
              </View>
            </View>

            <CalculateButton onPress={handleCalculate} />

            {result > 0 && (
              <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                <View style={{ padding: 5 }}>
                  <CalculationText />
                  <PieChart principal={principal} interest={result} />

                  <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>
                    <SimpleText text={'PRINCIPAL AMOUNT : '} value={principal} background={true} />
                    <InterestText text={'INTEREST RATE : '} value={rate} background={false} />
                    <YearText text={date == 'YEAR' ? 'YEARS :' : 'MONTHS :'} value={years} background={true} />
                    <SimpleText text={'TOTAL INTEREST :'} value={result} background={false} />
                    <SimpleText text={'MATURITY AMOUNT :'} value={endBalance} background={true} />
                  </View>

                  <ResetButton onPress={handleReset} />
                </View>
              </Animated.View>)
            }
            <View style={{ height: 120 }} />
          </View>
        </TouchableWithoutFeedback >
      </ScrollView>
      <AdBanner />
    </View>
  );
}
