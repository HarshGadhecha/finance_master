import React, { useState } from 'react';
import { Text, ScrollView, Keyboard, TouchableWithoutFeedback, StyleSheet, View, SafeAreaView, Button, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import { TextInputBackground } from '../../constants/Layout';
import { BackButton, CalculateButton, entering, exiting, InputInterest, InputPrincipal, ResetButton, SimpleText } from '../../constants/ReUsableComponents';
import finance from 'financejs';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import { StatusBar } from 'expo-status-bar';

export const DCF = ({ navigation }) => {
    LoadInterstitial();
    LoadRewardedInterstitial();

    const [cashFlows, setCashFlows] = useState([]);
    const [discountRate, setDiscountRate] = useState(0);
    const [presentValue, setPresentValue] = useState(0);

    const addCashFlow = () => {
        const newCashFlow = Number(cashFlowInput);
        if (!isNaN(newCashFlow) && cashFlowInput.trim() !== '') {
            setCashFlows([...cashFlows, newCashFlow]);
            setCashFlowInput('');
        }
    };

    const calculateDCF = () => {
        const presentValue = cashFlows.reduce((pv, cf, i) => {
            return pv + cf / Math.pow(1 + discountRate, i + 1);
        }, 0);
        setPresentValue(presentValue.toFixed(2));
    };

    const [cashFlowInput, setCashFlowInput] = useState('');


    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar style='dark' />
            <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={{ flex: 1 }}>
                        <BackButton />

                        <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>Discounted Cash Flow Calculation : </Text>

                        <Text style={styles.label}>Discount Rate:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={(text) => setDiscountRate(Number(text))}
                        />

                        <Text style={styles.label}>Cash Flows:</Text>
                        <View style={styles.cashFlowContainer}>
                            {cashFlows.map((cf, index) => (
                                <Text key={index} style={styles.cashFlow}>
                                    {cf}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.addCashFlowContainer}>
                            <TextInput
                                style={styles.addCashFlowInput}
                                keyboardType="numeric"
                                value={cashFlowInput}
                                onChangeText={(text) => setCashFlowInput(text)}
                            />
                            <Button
                                title="Add Cash Flow"
                                onPress={addCashFlow}
                                disabled={cashFlowInput.trim() === ''}
                            />
                        </View>

                        <Button title="Calculate DCF" onPress={calculateDCF} />

                        <CalculateButton onPress={calculateDCF} />

                        {presentValue > 0 && (
                            <Text style={styles.result}>
                                Present Value: {presentValue}
                            </Text>
                        )}
                        {/* {DCFResult !== '' && (
                        <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                            <View style={{ padding: 5 }}>
                                <Text style={{ color: HeadingColor, fontSize: 16, marginVertical: 5, fontWeight: 'bold', marginBottom: 10, marginHorizontal: 10 }}>CALCULATION</Text>
                                <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>
                                    <Text>{`DCF Result: $${DCFResult}`}</Text>
                                    <SimpleText text={'Present Value : $'} value={0} background={true} />
                                </View>
                                <ResetButton onPress={handleReset} />
                            </View>
                        </Animated.View>
                    )} */}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <AdBanner />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    cashFlowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    cashFlow: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
    addCashFlowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    }
})