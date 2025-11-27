import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, TouchableOpacity, FlatList, useColorScheme } from 'react-native';
import { ButtonColor, HeadingColor, height, inputStyle, MM, MR, MS, width } from '../../constants/Layout';
import { BackButton, Bold, CalculateButton, CalculationText, DecimalIn2, entering, exiting, InputInterest, InputPrincipal, InterestText, PieChartComponent, PieText, ResetButton, ScreenTitle, SimpleText, TextInputTitle, TextInputTitleResult, YearText } from '../../constants/ReUsableComponents';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import Animated from 'react-native-reanimated';
import { SwitchButtonGroup } from '../SwitchButtonGroup';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, ShowInterstitial, ShowRewardedInterstitial, interstitial } from '../../constants/AdMob';
import PieChart from '../Pie';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';

export const CompoundInterest = () => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    LoadInterstitial();
    LoadRewardedInterstitial();

    const options = ['Yearly', 'Half Yearly', 'Quaterly', 'Monthly'];
    const options2 = ['Y', 'M', 'D'];

    const [principal, setPrincipal] = useState();
    const [rate, setRate] = useState();
    const [years, setYears] = useState();
    const [results, setResults] = useState([]);
    const [endBalance, setEndBalance] = useState();

    const [term, setTerm] = useState(options2[0]);
    const [compounding, setCompounding] = useState(options[0]);

    const handleReset = () => {
        setPrincipal();
        setRate();
        setYears();
        setTerm(options2[0]);
        setCompounding(options[0]);
        setResults([]);
        setEndBalance();
        // ShowInterstitial();
    };

    const handleCalculate = () => {
        if (principal && rate && years && compounding) {
            let resultArray = [];
            let prevYearInterest = 0;
            let currentPrincipal = Number(principal);
            let t = years;

            //Switch case for month and days 
            switch (term) {
                case 'Y':
                    t = years;
                    break;
                case 'M':
                    t = (years / 12).toFixed(2);
                    break;
                case 'D':
                    t = (years / 365).toFixed(2);
                    break;
                default:
                    t = years;
                    break;
            }

            if (compounding === 'Yearly') {
                const yearsNumber = Number(t.replace(/[,|.]/g, '.'));
                const yearsInt = Math.floor(yearsNumber);
                const yearsFraction = yearsNumber - yearsInt;
                // calculate interest for full years
                for (let i = 1; i <= yearsInt; i++) {
                    const compoundInterest = currentPrincipal * (1 + (Number(rate.replace(/[,|.]/g, '.')) / 100));
                    const yearInterest = compoundInterest - currentPrincipal;
                    const yearResult = [i, DecimalIn2(yearInterest), DecimalIn2(yearInterest + prevYearInterest), DecimalIn2(compoundInterest)]

                    resultArray.push(yearResult);
                    prevYearInterest = yearInterest + prevYearInterest;
                    setEndBalance(compoundInterest.toFixed(2));
                    currentPrincipal = compoundInterest;

                }
                // calculate interest for fractional year
                if (yearsFraction > 0) {
                    const compoundInterest = currentPrincipal * (1 + (Number(rate.replace(/[,|.]/g, '.')) / 100) * yearsFraction);
                    const yearInterest = compoundInterest - currentPrincipal;
                    const yearResult = [(yearsInt + yearsFraction), DecimalIn2(yearInterest), DecimalIn2(yearInterest + prevYearInterest), DecimalIn2(compoundInterest)]

                    resultArray.push(yearResult);
                    setEndBalance(compoundInterest.toFixed(2));
                    //currentPrincipal = compoundInterest;
                }
            }
            else if (compounding === 'Half Yearly') {
                const yearsNumber = Number(t.replace(/[,|.]/g, '.') * 2);
                const yearsInt = Math.floor(yearsNumber);
                const yearsFraction = yearsNumber - yearsInt;
                // calculate interest for full years
                for (let i = 1; i <= yearsInt; i++) {
                    const compoundInterest = currentPrincipal * (1 + (Number(rate.replace(/[,|.]/g, '.')) / 200));
                    const yearInterest = compoundInterest - currentPrincipal;
                    const yearResult = [i / 2, DecimalIn2(yearInterest), DecimalIn2(yearInterest + prevYearInterest), DecimalIn2(compoundInterest)]

                    resultArray.push(yearResult);
                    prevYearInterest = yearInterest + prevYearInterest;
                    setEndBalance(compoundInterest.toFixed(2));
                    currentPrincipal = compoundInterest;

                }
                // calculate interest for fractional year
                if (yearsFraction > 0) {
                    const compoundInterest = currentPrincipal * (1 + (Number(rate.replace(/[,|.]/g, '.')) / 200) * yearsFraction);
                    const yearInterest = compoundInterest - currentPrincipal;
                    const yearResult = [(yearsInt / 2 + yearsFraction / 2), DecimalIn2(yearInterest), DecimalIn2(yearInterest + prevYearInterest), DecimalIn2(compoundInterest)]

                    resultArray.push(yearResult);
                    setEndBalance(compoundInterest.toFixed(2));
                    //currentPrincipal = compoundInterest;
                }
            }

            else if (compounding === 'Quaterly') {
                const yearsNumber = Number(t.replace(/[,|.]/g, '.') * 4);
                const yearsInt = Math.floor(yearsNumber);
                const yearsFraction = yearsNumber - yearsInt;
                // calculate interest for full years
                for (let i = 1; i <= yearsInt; i++) {
                    const compoundInterest = currentPrincipal * (1 + (Number(rate.replace(/[,|.]/g, '.')) / 400));
                    const yearInterest = compoundInterest - currentPrincipal;
                    const yearResult = [i / 4, DecimalIn2(yearInterest), DecimalIn2(yearInterest + prevYearInterest), DecimalIn2(compoundInterest)]

                    resultArray.push(yearResult);
                    prevYearInterest = yearInterest + prevYearInterest;
                    setEndBalance(compoundInterest.toFixed(2));
                    currentPrincipal = compoundInterest;

                }
                // calculate interest for fractional year
                if (yearsFraction > 0) {
                    const compoundInterest = currentPrincipal * (1 + (Number(rate.replace(/[,|.]/g, '.')) / 400) * yearsFraction);
                    const yearInterest = compoundInterest - currentPrincipal;
                    const yearResult = [(yearsInt / 4 + yearsFraction / 4), DecimalIn2(yearInterest), DecimalIn2(yearInterest + prevYearInterest), DecimalIn2(compoundInterest)]

                    resultArray.push(yearResult);
                    setEndBalance(compoundInterest.toFixed(2));
                }
            }

            //monthly
            else {
                const months = parseFloat(t.replace(/,/g, '.')) * 12;
                for (let i = 1; i <= months; i++) {
                    const compoundInterest = currentPrincipal * (1 + parseFloat(rate.replace(/,/g, '.')) / 1200) ** i;
                    const yearInterest = compoundInterest - currentPrincipal;
                    const monthResult = [i, DecimalIn2(yearInterest), DecimalIn2(yearInterest + prevYearInterest), DecimalIn2(compoundInterest)]
                    resultArray.push(monthResult);
                    prevYearInterest = yearInterest + prevYearInterest;
                    setEndBalance(compoundInterest.toFixed(2));
                }
            }
            setResults(resultArray);
            // ShowInterstitial();
        }
        else {
            alert('Please Fill Out All Fields');
        }
    }

    const handleOptionChange = (option) => {
        setCompounding(option);
        setEndBalance();
    };
    const handleChangeTerm = (option) => {
        setTerm(option);
        setYears();
        setEndBalance();
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

                            <ScreenTitle title={'Compound Interest Calculation'} />

                            <InputPrincipal text={'PRINCIPAL AMOUNT'} value={principal} onChangeText={(text) => { setEndBalance(); setPrincipal(text) }} />

                            <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
                                <View style={{ marginRight: 10, }}>
                                    <InputInterest text={'INTEREST RATE (APR %)'} value={rate} onChangeText={(text) => { setEndBalance(); setRate(text) }} />
                                </View>
                                <View>
                                    <SwitchButtonGroup
                                        options={options2}
                                        activeOption={term}
                                        onChange={handleChangeTerm}
                                        widthOption={40}
                                    />
                                    <TextInput
                                        placeholder={term == 'Y' ? '22' : '333'}
                                        maxLength={term == 'Y' ? 2 : 3}
                                        placeholderTextColor={'lightgrey'}
                                        keyboardType={'number-pad'}
                                        value={years}
                                        style={{ ...inputStyle.halfTextInput, ...inputStyle.textInputBackground, ...inputStyle.shadowBox }}
                                        onChangeText={(text) => {
                                            setEndBalance();
                                            setYears(text);
                                        }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInputTitle text={'COMPOUNDING FREQUENCY'} />
                            </View>

                            <SwitchButtonGroup
                                options={options}
                                activeOption={compounding}
                                onChange={handleOptionChange}
                                widthOption={width / 4 - 10}
                            />

                            <CalculateButton onPress={handleCalculate} />
                        </View>
                    }
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ paddingHorizontal: 2 }} />
                    )}
                    ListFooterComponent={
                        <View style={{ marginVertical: 2, alignContent: 'center', padding: 5, paddingHorizontal: 10 }}>
                            {endBalance > 0 && (
                                <Animated.View style={{ borderRadius: 25, borderWidth: 1, paddingVertical: 20 }} entering={entering} exiting={exiting}>
                                    <View style={{ padding: 10 }}>
                                        <CalculationText />
                                        <PieChart interest={endBalance - principal} principal={principal} />

                                        <View style={{ backgroundColor: themeColors.cardBackground, padding: 15, borderRadius: 15 }}>
                                            <SimpleText text={'PRINCIPAL AMOUNT :'} value={principal} background={true} />
                                            <InterestText text={'INTEREST RATE :'} value={rate} background={false} />
                                            <YearText text={term == 'Y' ? 'YEARS :' : term == 'M' ? 'Months :' : 'Days :'} value={years} background={true} />
                                            <SimpleText text={'TOTAL INTEREST :'} value={(endBalance - principal)} background={false} />
                                            <SimpleText text={'MATURITY AMOUNT :'} value={endBalance} background={true} />
                                        </View>

                                        <View style={table.tablebox}>
                                            <Row
                                                data={[compounding == options[0] ? 'YEAR' :
                                                    compounding == options[1] ? 'HALF YEAR' :
                                                        compounding == options[2] ? 'QUATERLY' : 'MONTH',

                                                compounding == options[0] ? 'YEARLY INTEREST' :
                                                    compounding == options[1] ? 'HALF YR. INTEREST' :
                                                        compounding == options[2] ? 'QUATERLY INTEREST' : 'MONTHLY INTEREST',
                                                    'TOTAL INTEREST',
                                                    'MATURITY AMOUNT']}
                                                style={table.titleStyle}
                                                textStyle={table.titleText} />

                                            <View style={{ margin: 6, top: -6, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, borderWidth: 0.5, borderColor: 'lightgrey' }}>
                                                <ScrollView nestedScrollEnabled
                                                    style={{
                                                        height: compounding == options[0] ? (years <= 10 ? years * 35 : 300) :
                                                            compounding == options[1] ? (years <= 5 ? years * 55 : 300) :
                                                                compounding == options[2] ? (years <= 2 ? years * 55 : 300) : 300
                                                    }}>
                                                    <Table borderStyle={{ borderWidth: 0.5, borderColor: 'lightgrey' }}>
                                                        <Rows data={results} textStyle={table.rowText} />
                                                    </Table>
                                                </ScrollView>
                                            </View>
                                        </View>
                                        <ResetButton onPress={handleReset} />
                                    </View>
                                </Animated.View>)
                            }
                            <View style={{ height: 120 }} />
                        </View>
                    }
                />
            </TouchableWithoutFeedback>
            <AdBanner />
        </View>
    );
}

const table = StyleSheet.create({
    tablebox: {
        marginVertical: 20, alignContent: 'center', borderRadius: 17, borderColor: '#4bc3de'
    },
    titleStyle: {
        height: 60, backgroundColor: '#fca961', borderTopStartRadius: 15, borderTopEndRadius: 15, marginHorizontal: 6,
    },
    titleText: {
        textAlign: 'center', margin: 2, fontSize: 11, fontFamily: MS
    },
    rowText: {
        textAlign: 'right', marginVertical: 6, marginRight: 5, fontSize: 12, fontFamily: MM
    }
})