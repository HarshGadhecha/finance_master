import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, SafeAreaView, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { HeadingColor, height, TextInputBackground } from '../../constants/Layout';
import { BackButton, CalculateButton, entering, exiting, InputInterest, InputPrincipal, InterestText, PieChartComponent, ResetButton, SimpleText, TextInputTitle, TextInputTitleResult, YearText } from '../../constants/ReUsableComponents';
import { ComingSoon } from '../ComingSoon';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, ShowInterstitial, ShowRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import { StatusBar } from 'expo-status-bar';

export const BY = ({ navigation }) => {
  LoadInterstitial();
  LoadRewardedInterstitial();

  const [bondPrice, setBondPrice] = useState('');
  const [faceValue, setFaceValue] = useState('');
  const [couponRate, setCouponRate] = useState('');
  const [yearsToMaturity, setYearsToMaturity] = useState('');
  const [yieldCalculation, setYieldCalculation] = useState('');


  const handleReset = () => {
    setBondPrice('');
    setFaceValue('');
    setCouponRate('');
    setYearsToMaturity('');
    setYieldCalculation('');
    // ShowInterstitial();
  };

  const handleCalculate = () => {
    if (bondPrice && faceValue && couponRate && yearsToMaturity) {
      const couponPayment = (faceValue * couponRate) / 100;
      const yieldValue = ((couponPayment + ((faceValue - bondPrice) / yearsToMaturity)) / ((faceValue + bondPrice) / 2)) * 100;
      //const yieldValue = (((couponPayment/bondPrice)*100));

      setYieldCalculation(yieldValue.toFixed(2));
      // ShowInterstitial();

    }
    else{
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
            <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>Bond Yeild Calculation : </Text>

            <ComingSoon />
            {/* <InputPrincipal text={'BOND PRICE'} value={bondPrice} onChangeText={(text) => { setYieldCalculation(''); setBondPrice(text) }} />
          <InputPrincipal text={'FACE VALUE'} value={faceValue} onChangeText={(text) => { setYieldCalculation(''); setFaceValue(text) }} />

          <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <View style={{ marginRight: 10 }}>
              <InputInterest text={'COUPON RATE (%)'} value={couponRate} onChangeText={(text) => { setYieldCalculation(''); setCouponRate(text) }} />
            </View>
            <View>
              <InputInterest text={'YEARS TO MATURITY'} value={yearsToMaturity} onChangeText={(text) => { setYieldCalculation(''); setYearsToMaturity(text) }} />
            </View>
          </View>

          <CalculateButton onPress={handleCalculate} />

          <View>
            {yieldCalculation.length > 0 ?
              <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                <View style={{ padding: 5 }}>
                  <Text style={{ color: HeadingColor, fontSize: 16, marginVertical: 5, fontWeight: 'bold', marginBottom: 10, marginHorizontal: 10 }}>CALCULATION</Text>

                  <PieChartComponent data={pieData} value={yieldCalculation} />
                  <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>

                    <SimpleText text={'Bond Price : '} value={bondPrice} background={true} />
                    <SimpleText text={'Face Value : '} value={faceValue} background={false} />

                    <InterestText text={'Coupon Rate : '} value={couponRate} background={true} />
                    <YearText text={'Years to Maturity :'} value={yearsToMaturity} background={false} />
                    <YearText text={'Yeild :'} value={yieldCalculation} background={true} />
                  </View>
                  <ResetButton onPress={handleReset} />
                </View>
              </Animated.View> :
              null
            }
          </View> */}
             <View style={{ height: 120}} />
          </View>
        </TouchableWithoutFeedback >
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}
