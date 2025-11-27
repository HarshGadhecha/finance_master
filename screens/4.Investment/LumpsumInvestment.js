import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, useColorScheme, Platform } from 'react-native';
import { BackButton, CalculateButton, ResetButton, TextInputTitle, StyledInput, feedbackOptions, CURRENCY_OPTIONS, selectedCurrencyIndex, DecimalIn2, CalculationText } from '../../constants/ReUsableComponents';
import { height, width, inputStyle, MM, MS } from '../../constants/Layout';
import Colors, { ChartColors } from '../../constants/Colors';
import PieChart from '../Pie';
import SegmentControl from '../SegmentControl';
import { AdBanner } from '../../constants/AdMob';
import HapticFeedback from 'react-native-haptic-feedback';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LumpsumInvestment() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const [investmentAmount, setInvestmentAmount] = useState('');
    const [expectedReturn, setExpectedReturn] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [timeUnit, setTimeUnit] = useState('Years');

    // Results
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [totalReturns, setTotalReturns] = useState(0);
    const [maturityValue, setMaturityValue] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleCalculate = () => {
        if (!investmentAmount || !expectedReturn || !timePeriod) {
            alert('Please fill all fields');
            return;
        }

        const P = parseFloat(investmentAmount);
        const r = parseFloat(expectedReturn) / 100;
        const t = timeUnit === 'Years' ? parseFloat(timePeriod) : parseFloat(timePeriod) / 12;

        if (P <= 0 || r < 0 || t <= 0) {
            alert('Please enter valid positive numbers');
            return;
        }

        // Compound Interest Formula: A = P(1 + r)^t
        const maturity = P * Math.pow(1 + r, t);
        const returns = maturity - P;

        setTotalInvestment(P);
        setTotalReturns(returns);
        setMaturityValue(maturity);
        setShowResults(true);

        HapticFeedback.trigger('notificationSuccess', feedbackOptions);
    };

    const handleReset = () => {
        setInvestmentAmount('');
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
                        Lumpsum Investment
                    </Text>

                    <Text style={{
                        fontSize: 14,
                        fontFamily: MS,
                        color: themeColors.textSecondary,
                        marginBottom: 20,
                        lineHeight: 20
                    }}>
                        Calculate returns from a one-time lumpsum investment.
                        See how your money grows with compound interest.
                    </Text>

                    {/* Investment Amount Input */}
                    <View style={{ marginVertical: 10 }}>
                        <StyledInput
                            label="Investment Amount"
                            value={investmentAmount}
                            onChangeText={setInvestmentAmount}
                            placeholder='100000'
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

                            {/* Info Card */}
                            <View style={{
                                backgroundColor: themeColors.cardBackground,
                                borderRadius: 15,
                                padding: 20,
                                marginVertical: 15,
                                borderWidth: 1,
                                borderColor: themeColors.cardBorder,
                            }}>
                                <Text style={{
                                    color: themeColors.text,
                                    fontSize: 16,
                                    fontFamily: MM,
                                    marginBottom: 10
                                }}>
                                    💡 Investment Tips
                                </Text>
                                <Text style={{ color: themeColors.textSecondary, fontSize: 12, fontFamily: MS, lineHeight: 20 }}>
                                    • Lumpsum works best when markets are low{'\n'}
                                    • Consider SIP if investing regularly{'\n'}
                                    • Diversify across asset classes{'\n'}
                                    • Stay invested for long term{'\n'}
                                    • Review returns annually
                                </Text>
                            </View>

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
