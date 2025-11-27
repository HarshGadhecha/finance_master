import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, useColorScheme, Platform } from 'react-native';
import { BackButton, CalculateButton, ResetButton, TextInputTitle, StyledInput, feedbackOptions, CURRENCY_OPTIONS, selectedCurrencyIndex, DecimalIn2, CalculationText } from '../../constants/ReUsableComponents';
import { height, width, inputStyle, MM, MS } from '../../constants/Layout';
import Colors, { ChartColors } from '../../constants/Colors';
import PieChart from '../Pie';
import SegmentControl from '../SegmentControl';
import { AdBanner } from '../../constants/AdMob';
import HapticFeedback from 'react-native-haptic-feedback';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SIPCalculator() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const [monthlyInvestment, setMonthlyInvestment] = useState('');
    const [expectedReturn, setExpectedReturn] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [timeUnit, setTimeUnit] = useState('Years');

    // Results
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [totalReturns, setTotalReturns] = useState(0);
    const [maturityValue, setMaturityValue] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleCalculate = () => {
        if (!monthlyInvestment || !expectedReturn || !timePeriod) {
            alert('Please fill all fields');
            return;
        }

        const P = parseFloat(monthlyInvestment);
        const r = parseFloat(expectedReturn) / 100 / 12; // Monthly rate
        const months = timeUnit === 'Years' ? parseFloat(timePeriod) * 12 : parseFloat(timePeriod);

        if (P <= 0 || r <= 0 || months <= 0) {
            alert('Please enter valid positive numbers');
            return;
        }

        // SIP Formula: M = P × ({[1 + i]^n – 1} / i) × (1 + i)
        const maturity = P * (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
        const invested = P * months;
        const returns = maturity - invested;

        setTotalInvestment(invested);
        setTotalReturns(returns);
        setMaturityValue(maturity);
        setShowResults(true);

        HapticFeedback.trigger('notificationSuccess', feedbackOptions);
    };

    const handleReset = () => {
        setMonthlyInvestment('');
        setExpectedReturn('');
        setTimePeriod('');
        setTimeUnit('Years');
        setTotalInvestment(0);
        setTotalReturns(0);
        setMaturityValue(0);
        setShowResults(false);
        HapticFeedback.trigger('impactLight', feedbackOptions);
    };

    const ResultCard = ({ title, value, color }) => (
        <View style={{
            backgroundColor: themeColors.cardBackground,
            borderRadius: 15,
            padding: 20,
            marginVertical: 8,
            borderWidth: 1,
            borderColor: themeColors.cardBorder,
            shadowColor: themeColors.cardShadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        }}>
            <Text style={{
                color: themeColors.textSecondary,
                fontSize: 14,
                fontFamily: MS,
                marginBottom: 8
            }}>
                {title}
            </Text>
            <Text style={{
                color: color || themeColors.text,
                fontSize: 24,
                fontFamily: MM,
                fontWeight: 'bold'
            }}>
                {CURRENCY_OPTIONS[selectedCurrencyIndex].symbol} {DecimalIn2(value)}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20 }}>
                    <BackButton />

                    <Text style={{
                        fontSize: 28,
                        fontFamily: MM,
                        color: themeColors.text,
                        marginVertical: 20
                    }}>
                        SIP Calculator
                    </Text>

                    <Text style={{
                        fontSize: 14,
                        fontFamily: MS,
                        color: themeColors.textSecondary,
                        marginBottom: 20,
                        lineHeight: 20
                    }}>
                        Calculate returns from Systematic Investment Plan (SIP).
                        SIP helps you invest regularly in mutual funds.
                    </Text>

                    {/* Monthly Investment Input */}
                    <View style={{ marginVertical: 10 }}>
                        <StyledInput
                            label="Monthly Investment"
                            value={monthlyInvestment}
                            onChangeText={setMonthlyInvestment}
                            placeholder='5000'
                            keyboardType='number-pad'
                            width='full'
                            showCurrency={true}
                            withShadow={true}
                        />
                    </View>

                    {/* Expected Return Input */}
                    <View style={{ marginVertical: 10 }}>
                        <StyledInput
                            label="Expected Annual Return (%)"
                            value={expectedReturn}
                            onChangeText={setExpectedReturn}
                            placeholder='12'
                            keyboardType='decimal-pad'
                            width='half'
                            withShadow={true}
                        />
                    </View>

                    {/* Time Period Input */}
                    <View style={{ marginVertical: 10 }}>
                        <StyledInput
                            label={`Time Period (${timeUnit})`}
                            value={timePeriod}
                            onChangeText={setTimePeriod}
                            placeholder='10'
                            keyboardType='number-pad'
                            width='half'
                            withShadow={true}
                        />
                    </View>

                    {/* Time Unit Selector */}
                    <View style={{ marginVertical: 10 }}>
                        <SegmentControl
                            values={['Years', 'Months']}
                            selectedIndex={timeUnit === 'Years' ? 0 : 1}
                            onChange={(index) => {
                                setTimeUnit(index === 0 ? 'Years' : 'Months');
                            }}
                        />
                    </View>

                    {/* Calculate Button */}
                    <CalculateButton onPress={handleCalculate} />

                    {/* Results Section */}
                    {showResults && (
                        <View style={{ marginTop: 20 }}>
                            <CalculationText />

                            {/* Pie Chart */}
                            <View style={{ alignItems: 'center', marginVertical: 30 }}>
                                <PieChart
                                    data1={totalInvestment}
                                    data2={totalReturns}
                                    color1={ChartColors.principal}
                                    color2={ChartColors.interest}
                                />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                    flexWrap: 'wrap'
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                                        <View style={{
                                            width: 16,
                                            height: 16,
                                            backgroundColor: ChartColors.principal,
                                            borderRadius: 4,
                                            marginRight: 6
                                        }} />
                                        <Text style={{ color: themeColors.textSecondary, fontSize: 12, fontFamily: MS }}>
                                            Invested
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                                        <View style={{
                                            width: 16,
                                            height: 16,
                                            backgroundColor: ChartColors.interest,
                                            borderRadius: 4,
                                            marginRight: 6
                                        }} />
                                        <Text style={{ color: themeColors.textSecondary, fontSize: 12, fontFamily: MS }}>
                                            Returns
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Result Cards */}
                            <ResultCard
                                title="Total Investment"
                                value={totalInvestment}
                                color={ChartColors.principal}
                            />
                            <ResultCard
                                title="Estimated Returns"
                                value={totalReturns}
                                color={ChartColors.interest}
                            />
                            <ResultCard
                                title="Maturity Value"
                                value={maturityValue}
                                color={themeColors.primary}
                            />

                            {/* Reset Button */}
                            <ResetButton onPress={handleReset} />
                        </View>
                    )}

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Ad Banner */}
            <View style={{ position: 'absolute', bottom: 0, width: width }}>
                <AdBanner />
            </View>
        </SafeAreaView>
    );
}
