import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TextInput, useColorScheme, Platform } from 'react-native';
import { BackButton, CalculateButton, ResetButton, TextInputTitle, feedbackOptions, CURRENCY_OPTIONS, selectedCurrencyIndex, DecimalIn2, CalculationText } from '../../constants/ReUsableComponents';
import { height, width, inputStyle, MM, MS } from '../../constants/Layout';
import Colors, { ChartColors } from '../../constants/Colors';
import PieChart from '../Pie';
import { AdBanner } from '../../constants/AdMob';
import HapticFeedback from 'react-native-haptic-feedback';

export default function IncomeTaxCalculator() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const [annualIncome, setAnnualIncome] = useState('');
    const [deductions, setDeductions] = useState('');

    // Results
    const [taxableIncome, setTaxableIncome] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [takeHomeSalary, setTakeHomeSalary] = useState(0);
    const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // Simplified progressive tax calculation (can be customized for different countries)
    const calculateTax = (income) => {
        // Example tax slabs (customize as needed)
        const slabs = [
            { limit: 250000, rate: 0 },
            { limit: 500000, rate: 5 },
            { limit: 750000, rate: 10 },
            { limit: 1000000, rate: 15 },
            { limit: 1250000, rate: 20 },
            { limit: 1500000, rate: 25 },
            { limit: Infinity, rate: 30 }
        ];

        let tax = 0;
        let remainingIncome = income;
        let previousLimit = 0;

        for (const slab of slabs) {
            const slabIncome = Math.min(remainingIncome, slab.limit - previousLimit);
            if (slabIncome > 0) {
                tax += slabIncome * (slab.rate / 100);
                remainingIncome -= slabIncome;
                previousLimit = slab.limit;
            }
            if (remainingIncome <= 0) break;
        }

        return tax;
    };

    const handleCalculate = () => {
        if (!annualIncome) {
            alert('Please enter annual income');
            return;
        }

        const income = parseFloat(annualIncome);
        const deduct = deductions ? parseFloat(deductions) : 0;

        if (income <= 0) {
            alert('Please enter valid income');
            return;
        }

        const taxable = Math.max(0, income - deduct);
        const tax = calculateTax(taxable);
        const takeHome = income - tax;
        const effectiveRate = income > 0 ? (tax / income) * 100 : 0;

        setTaxableIncome(taxable);
        setTotalTax(tax);
        setTakeHomeSalary(takeHome);
        setEffectiveTaxRate(effectiveRate);
        setShowResults(true);

        HapticFeedback.trigger('notificationSuccess', feedbackOptions);
    };

    const handleReset = () => {
        setAnnualIncome('');
        setDeductions('');
        setTaxableIncome(0);
        setTotalTax(0);
        setTakeHomeSalary(0);
        setEffectiveTaxRate(0);
        setShowResults(false);
        HapticFeedback.trigger('impactLight', feedbackOptions);
    };

    const ResultCard = ({ title, value, color, isPercentage = false }) => (
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
                {isPercentage
                    ? `${DecimalIn2(value)}%`
                    : `${CURRENCY_OPTIONS[selectedCurrencyIndex].symbol} ${DecimalIn2(value)}`
                }
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 0 : 20 }}>
                    <BackButton />

                    <Text style={{
                        fontSize: 28,
                        fontFamily: MM,
                        color: themeColors.text,
                        marginVertical: 20
                    }}>
                        Income Tax Calculator
                    </Text>

                    <Text style={{
                        fontSize: 14,
                        fontFamily: MS,
                        color: themeColors.textSecondary,
                        marginBottom: 20,
                        lineHeight: 20
                    }}>
                        Calculate your income tax based on progressive tax slabs.
                        Enter your annual income and deductions to see your tax liability.
                    </Text>

                    {/* Annual Income Input */}
                    <View style={{ marginVertical: 10 }}>
                        <TextInputTitle text="Annual Income" c={'(' + CURRENCY_OPTIONS[selectedCurrencyIndex].symbol + ')'} />
                        <TextInput
                            placeholder='1000000'
                            value={annualIncome}
                            placeholderTextColor={themeColors.inputPlaceholder}
                            keyboardType='number-pad'
                            style={{
                                ...inputStyle.fullTextInput,
                                backgroundColor: themeColors.inputBackground,
                                color: themeColors.inputText,
                                borderColor: themeColors.inputBorder,
                                borderWidth: 1
                            }}
                            onChangeText={setAnnualIncome}
                        />
                    </View>

                    {/* Deductions Input */}
                    <View style={{ marginVertical: 10 }}>
                        <TextInputTitle text="Total Deductions (Optional)" c={'(' + CURRENCY_OPTIONS[selectedCurrencyIndex].symbol + ')'} />
                        <TextInput
                            placeholder='150000'
                            value={deductions}
                            placeholderTextColor={themeColors.inputPlaceholder}
                            keyboardType='number-pad'
                            style={{
                                ...inputStyle.fullTextInput,
                                backgroundColor: themeColors.inputBackground,
                                color: themeColors.inputText,
                                borderColor: themeColors.inputBorder,
                                borderWidth: 1
                            }}
                            onChangeText={setDeductions}
                        />
                        <Text style={{
                            fontSize: 12,
                            fontFamily: MS,
                            color: themeColors.textSecondary,
                            marginTop: 8,
                            fontStyle: 'italic'
                        }}>
                            Include 80C, HRA, and other deductions
                        </Text>
                    </View>

                    {/* Calculate Button */}
                    <CalculateButton onPress={handleCalculate} />

                    {/* Results Section */}
                    {showResults && (
                        <View style={{ marginTop: 20 }}>
                            <CalculationText />

                            {/* Pie Chart */}
                            {totalTax > 0 && (
                                <View style={{ alignItems: 'center', marginVertical: 30 }}>
                                    <PieChart
                                        data1={takeHomeSalary}
                                        data2={totalTax}
                                        color1={ChartColors.profit}
                                        color2={ChartColors.loss}
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
                                                backgroundColor: ChartColors.profit,
                                                borderRadius: 4,
                                                marginRight: 6
                                            }} />
                                            <Text style={{ color: themeColors.textSecondary, fontSize: 12, fontFamily: MS }}>
                                                Take Home
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                                            <View style={{
                                                width: 16,
                                                height: 16,
                                                backgroundColor: ChartColors.loss,
                                                borderRadius: 4,
                                                marginRight: 6
                                            }} />
                                            <Text style={{ color: themeColors.textSecondary, fontSize: 12, fontFamily: MS }}>
                                                Tax
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )}

                            {/* Result Cards */}
                            <ResultCard
                                title="Taxable Income"
                                value={taxableIncome}
                                color={themeColors.heading}
                            />
                            <ResultCard
                                title="Total Tax"
                                value={totalTax}
                                color={themeColors.error}
                            />
                            <ResultCard
                                title="Take Home Salary"
                                value={takeHomeSalary}
                                color={themeColors.success}
                            />
                            <ResultCard
                                title="Effective Tax Rate"
                                value={effectiveTaxRate}
                                color={themeColors.info}
                                isPercentage={true}
                            />

                            {/* Tax Slab Info */}
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
                                    marginBottom: 15
                                }}>
                                    Tax Slabs (Simplified)
                                </Text>
                                <Text style={{ color: themeColors.textSecondary, fontSize: 12, fontFamily: MS, lineHeight: 20 }}>
                                    • Up to 2.5L: 0%{'\n'}
                                    • 2.5L - 5L: 5%{'\n'}
                                    • 5L - 7.5L: 10%{'\n'}
                                    • 7.5L - 10L: 15%{'\n'}
                                    • 10L - 12.5L: 20%{'\n'}
                                    • 12.5L - 15L: 25%{'\n'}
                                    • Above 15L: 30%
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
