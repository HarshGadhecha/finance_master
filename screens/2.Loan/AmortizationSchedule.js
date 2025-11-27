import React, { useState } from 'react';
import { View, Button, Text, TextInput, TouchableWithoutFeedback, FlatList, Keyboard, TouchableOpacity, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { ButtonColor, HeadingColor, height, inputStyle, TextInputBackground, width } from '../../constants/Layout';
import { BackButton, CalculateButton, CalculationText, DecimalIn2, entering, exiting, formatNumber, InputInterest, InputPrincipal, InterestText, PieChartComponent, ResetButton, SimpleText, TextInputTitle, TextInputTitleResult, YearText } from '../../constants/ReUsableComponents';
import { Table, Row, Rows } from 'react-native-table-component';
import Animated from 'react-native-reanimated';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, ShowInterstitial, ShowRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';

export const AmortisationCalculator = () => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    LoadRewardedInterstitial();
    LoadInterstitial();

    const [loanAmount, setLoanAmount] = useState();
    const [interestRate, setInterestRate] = useState();
    const [loanTerm, setLoanTerm] = useState();
    const [amortisationSchedule, setAmortisationSchedule] = useState([]);
    const [monthlyPayment, setMonthlyPayment] = useState();

    const handleReset = () => {
        setLoanAmount();
        setInterestRate();
        setLoanTerm();
        setAmortisationSchedule([]);
        setMonthlyPayment();
        // ShowInterstitial();
    };

    const handleCalculate = () => {
        if (loanAmount && interestRate && loanTerm) {
            const loanAmountFloat = parseFloat(loanAmount);
            const interestRateFloat = parseFloat(interestRate.replace(/[,|.]/g, '.'));
            const loanTermInt = parseInt(loanTerm.replace(/[,|.]/g, '.'));

            // Calculate monthly interest rate
            const monthlyInterestRate = interestRateFloat / 1200;

            // Calculate monthly payment
            const monthlyPaymentValue =
                (monthlyInterestRate * loanAmountFloat) /
                (1 - Math.pow(1 + monthlyInterestRate, -loanTermInt));
            setMonthlyPayment(monthlyPaymentValue);
            // Calculate the amortisation schedule
            let balance = loanAmountFloat;
            const amortisationSchedule = [];
            for (let i = 1; i <= loanTermInt; i++) {
                const interest = balance * monthlyInterestRate;
                const principal = (monthlyPaymentValue - interest);
                balance -= (principal);
                amortisationSchedule.push([i, DecimalIn2((monthlyPaymentValue)), DecimalIn2(interest), DecimalIn2(principal), DecimalIn2(balance)]);
            }
            setAmortisationSchedule(amortisationSchedule);
            // ShowInterstitial();

        }
        else {
            alert('Please Fill Out All Fields');
        }
    };

    return (
        <View style={{ backgroundColor: themeColors.background, flex: 1 }}>

            <StatusBar style='dark' />
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={false}
                    ListHeaderComponent={
                        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                            <BackButton />
                            <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>Amortisation Schedule Calculator : </Text>

                            <InputPrincipal text={'Loan Amount'} value={loanAmount} onChangeText={(text) => { setAmortisationSchedule([]), setLoanAmount(text) }} />

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ marginRight: 10 }}>
                                    <InputInterest text={'INTEREST RATE (%)'} value={interestRate} onChangeText={(text) => { setAmortisationSchedule([]), setInterestRate(text) }} />
                                </View>
                                <View>
                                    <InputInterest text={'LOAN TERM (Month)'} value={loanTerm} onChangeText={(text) => { setAmortisationSchedule([]), setLoanTerm(text); if (text.length == 3) Keyboard.dismiss() }} />
                                </View>
                            </View>

                            <CalculateButton onPress={handleCalculate} />
                        </View>
                    }
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ paddingHorizontal: 2 }} />
                    )}
                    ListFooterComponent={
                        <View style={{ marginVertical: 2, alignContent: 'center', padding: 5, paddingHorizontal: 10 }}>
                            {amortisationSchedule.length == 0 ? null :
                                <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                                    <View style={{ padding: 10 }}>
                                        <CalculationText />
                                        <PieChart data1={'Loan Amount'} principal={loanAmount} interest={monthlyPayment * loanTerm.replace(/,/g, '.') - loanAmount} />

                                        <View style={{ backgroundColor: TextInputBackground, padding: 15, borderRadius: 15 }}>

                                            <SimpleText text={'LOAN AMOUNT : '} value={loanAmount} background={true} />
                                            <InterestText text={'INTEREST RATE : '} value={interestRate} background={false} />
                                            <YearText text={'LOAN TERM (Month) :'} value={loanTerm} background={true} />
                                            <SimpleText text={'MONTHLY PAYMENT :'} value={(monthlyPayment)} background={false} />
                                            <SimpleText text={'TOTAL INTEREST  :'} value={((monthlyPayment * loanTerm.replace(/[,|.]/g, '.') - loanAmount)).toFixed(2)} background={true} />
                                            <SimpleText text={'TOTAL PAYOFF :'} value={(monthlyPayment * loanTerm.replace(/[,|.]/g, '.')).toFixed(2)} background={false} />
                                        </View>

                                        <View style={table.tablebox}>
                                            <Row
                                                data={['MONTH', 'AMOUNT', 'INTEREST', 'PRINCIPAL', 'BALANCE']}
                                                style={table.titleStyle}
                                                textStyle={table.titleText} />

                                            <View style={{ top: 0, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, overflow: 'hidden', borderWidth: 0.5, borderColor: 'lightgrey' }}>
                                                <ScrollView nestedScrollEnabled style={{ height: loanTerm.replace(/[,|.]/g, '.') <= 10 ? 26 * loanTerm.replace(/[,|.]/g, '.') : 310 }}>
                                                    <Table borderStyle={{ borderWidth: 0.5, borderColor: 'lightgrey' }}>
                                                        <Rows data={amortisationSchedule}
                                                            textStyle={table.rowText} />
                                                    </Table>
                                                </ScrollView>
                                            </View>
                                        </View>
                                        <ResetButton onPress={handleReset} />
                                    </View>
                                </Animated.View>
                            }
                            <View style={{ height: 120 }} />
                        </View>
                    }
                />

            </TouchableWithoutFeedback>
            <AdBanner />
        </View>
    );
};


const table = StyleSheet.create({
    tablebox: {
        marginVertical: 20, alignContent: 'center', borderRadius: 17, borderColor: '#4bc3de'
    },
    titleStyle: {
        height: 60, backgroundColor: '#fca961', borderTopStartRadius: 15, borderTopEndRadius: 15, marginHorizontal: 0,
    },
    titleText: {
        textAlign: 'center', margin: 2, fontSize: 11, fontWeight: 'bold'
    },
    rowStyle: {

    },
    rowText: {
        textAlign: 'right', marginVertical: 6, marginRight: 5, fontSize: 11
    }
})