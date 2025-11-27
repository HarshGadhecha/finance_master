import React, { useState } from 'react';
import { Text, ScrollView, Keyboard, TouchableWithoutFeedback, StyleSheet, View, SafeAreaView, Button, TextInput, Alert } from 'react-native';
import Animated from 'react-native-reanimated';
import { TextInputBackground } from '../../constants/Layout';
import { BackButton, CalculateButton, entering, exiting, InputInterest, InputPrincipal, ResetButton, SimpleText } from '../../constants/ReUsableComponents';
import finance from 'financejs';
import { ComingSoon } from '../ComingSoon';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import { StatusBar } from 'expo-status-bar';


export const DCF = ({ navigation }) => {
    LoadInterstitial();
    LoadRewardedInterstitial();

    const [freeCashFlow, setFreeCashFlow] = useState('');
    const [discountRate, setDiscountRate] = useState('');
    const [terminalValue, setTerminalValue] = useState('');
    const [numOfYears, setNumOfYears] = useState('');
    const [dcf, setDcf] = useState(0);
    const [pvfcf, setPvfcf] = useState([]);

    const calculateDcf = () => {
        const tempPvfcf = [];
        let totalPvfcf = 0;

        for (let i = 1; i <= numOfYears; i++) {
            const pv = freeCashFlow / (1 + discountRate) ** i;
            tempPvfcf.push(pv);
            totalPvfcf += pv;
        }

        const terminalValuePresent = terminalValue / (1 + discountRate) ** numOfYears;
        const totalDcf = totalPvfcf + terminalValuePresent;

        setDcf(totalDcf.toFixed(2));
        setPvfcf(tempPvfcf);
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar style='dark' />
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
                    <BackButton />
                    <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>Discounted Cash Flow Calculation : </Text>
                    <ComingSoon />
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>DCF Calculator</Text>
                        <Text style={{ paddingBottom: 5 }}>Free Cash Flow:</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                            onChangeText={value => setFreeCashFlow(value)}
                            value={freeCashFlow}
                            keyboardType='numeric'
                        />
                        <Text style={{ paddingBottom: 5 }}>Discount Rate:</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                            onChangeText={value => setDiscountRate(value)}
                            value={discountRate}
                            keyboardType='numeric'
                        />
                        <Text style={{ paddingBottom: 5 }}>Terminal Value:</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                            onChangeText={value => setTerminalValue(value)}
                            value={terminalValue}
                            keyboardType='numeric'
                        />
                        <Text style={{ paddingBottom: 5 }}>Number of Years:</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                            onChangeText={value => setNumOfYears(value)}
                            value={numOfYears}
                            keyboardType='numeric'
                        />
                        <Button
                            title="Calculate DCF"
                            onPress={calculateDcf}
                        />
                        
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>PVFCF Array:</Text>
                            {pvfcf.map((pvfcf, index) => (
                                <Text key={index}>Year {index + 1}: {pvfcf.toFixed(2)}</Text>
                            ))}
                        </View>

                        {dcf !== '' && <Text style={{ paddingTop: 10 }}>DCF: {dcf}</Text>}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <AdBanner />
        </SafeAreaView>

    );
}