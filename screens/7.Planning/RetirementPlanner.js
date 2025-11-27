import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TextInput, useColorScheme, Platform } from 'react-native';
import { BackButton, CalculateButton, ResetButton, TextInputTitle, feedbackOptions, CURRENCY_OPTIONS, selectedCurrencyIndex, DecimalIn2, CalculationText } from '../../constants/ReUsableComponents';
import { height, width, inputStyle, MM, MS } from '../../constants/Layout';
import Colors, { ChartColors } from '../../constants/Colors';
import PieChart from '../Pie';
import { AdBanner } from '../../constants/AdMob';
import HapticFeedback from 'react-native-haptic-feedback';

export default function RetirementPlanner() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const [currentAge, setCurrentAge] = useState('');
    const [retirementAge, setRetirementAge] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [expectedReturn, setExpectedReturn] = useState('');
    const [lifeExpectancy, setLifeExpectancy] = useState('85');

    // Results
    const [yearsToRetirement, setYearsToRetirement] = useState(0);
    const [totalContributions, setTotalContributions] = useState(0);
    const [retirementCorpus, setRetirementCorpus] = useState(0);
    const [growthOnSavings, setGrowthOnSavings] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleCalculate = () => {
        if (!currentAge || !retirementAge || !monthlyContribution || !expectedReturn) {
            alert('Please fill all required fields');
            return;
        }

        const age = parseFloat(currentAge);
        const retAge = parseFloat(retirementAge);
        const savings = currentSavings ? parseFloat(currentSavings) : 0;
        const monthly = parseFloat(monthlyContribution);
        const returnRate = parseFloat(expectedReturn) / 100 / 12;

        if (age >= retAge) {
            alert('Retirement age must be greater than current age');
            return;
        }

        const years = retAge - age;
        const months = years * 12;

        // Future value of current savings
        const fvSavings = savings * Math.pow(1 + returnRate, months);

        // Future value of monthly contributions (SIP formula)
        const fvContributions = monthly * (((Math.pow(1 + returnRate, months) - 1) / returnRate) * (1 + returnRate));

        const totalCorpus = fvSavings + fvContributions;
        const totalContrib = (monthly * months) + savings;
        const growth = totalCorpus - totalContrib;

        setYearsToRetirement(years);
        setTotalContributions(totalContrib);
        setRetirementCorpus(totalCorpus);
        setGrowthOnSavings(growth);
        setShowResults(true);

        HapticFeedback.trigger('notificationSuccess', feedbackOptions);
    };

    const handleReset = () => {
        setCurrentAge('');
        setRetirementAge('');
        setCurrentSavings('');
        setMonthlyContribution('');
        setExpectedReturn('');
        setLifeExpectancy('85');
        setYearsToRetirement(0);
        setTotalContributions(0);
        setRetirementCorpus(0);
        setGrowthOnSavings(0);
        setShowResults(false);
        HapticFeedback.trigger('impactLight', feedbackOptions);
    };

    const ResultCard = ({ title, value, color, subtitle }) => (
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
            {subtitle && (
                <Text style={{
                    color: themeColors.textSecondary,
                    fontSize: 12,
                    fontFamily: MS,
                    marginTop: 5
                }}>
                    {subtitle}
                </Text>
            )}
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
                        Retirement Planner
                    </Text>

                    <Text style={{
                        fontSize: 14,
                        fontFamily: MS,
                        color: themeColors.textSecondary,
                        marginBottom: 20,
                        lineHeight: 20
                    }}>
                        Plan for your retirement by calculating how much you need to save.
                        See how your savings will grow over time.
                    </Text>

                    {/* Current Age Input */}
                    <View style={{ marginVertical: 10 }}>
                        <TextInputTitle text="Current Age (years)" />
                        <TextInput
                            placeholder='30'
                            value={currentAge}
                            placeholderTextColor={themeColors.inputPlaceholder}
                            keyboardType='number-pad'
                            style={{
                                ...inputStyle.halfTextInput,
                                backgroundColor: themeColors.inputBackground,
                                color: themeColors.inputText,
                                borderColor: themeColors.inputBorder,
                                borderWidth: 1
                            }}
                            onChangeText={setCurrentAge}
                        />
                    </View>

                    {/* Retirement Age Input */}
                    <View style={{ marginVertical: 10 }}>
                        <TextInputTitle text="Retirement Age (years)" />
                        <TextInput
                            placeholder='60'
                            value={retirementAge}
                            placeholderTextColor={themeColors.inputPlaceholder}
                            keyboardType='number-pad'
                            style={{
                                ...inputStyle.halfTextInput,
                                backgroundColor: themeColors.inputBackground,
                                color: themeColors.inputText,
                                borderColor: themeColors.inputBorder,
                                borderWidth: 1
                            }}
                            onChangeText={setRetirementAge}
                        />
                    </View>

                    {/* Current Savings Input */}
                    <View style={{ marginVertical: 10 }}>
                        <TextInputTitle text="Current Savings (Optional)" c={'(' + CURRENCY_OPTIONS[selectedCurrencyIndex].symbol + ')'} />
                        <TextInput
                            placeholder='500000'
                            value={currentSavings}
                            placeholderTextColor={themeColors.inputPlaceholder}
                            keyboardType='number-pad'
                            style={{
                                ...inputStyle.fullTextInput,
                                backgroundColor: themeColors.inputBackground,
                                color: themeColors.inputText,
                                borderColor: themeColors.inputBorder,
                                borderWidth: 1
                            }}
                            onChangeText={setCurrentSavings}
                        />
                    </View>

                    {/* Monthly Contribution Input */}
                    <View style={{ marginVertical: 10 }}>
                        <TextInputTitle text="Monthly Contribution" c={'(' + CURRENCY_OPTIONS[selectedCurrencyIndex].symbol + ')'} />
                        <TextInput
                            placeholder='10000'
                            value={monthlyContribution}
                            placeholderTextColor={themeColors.inputPlaceholder}
                            keyboardType='number-pad'
                            style={{
                                ...inputStyle.fullTextInput,
                                backgroundColor: themeColors.inputBackground,
                                color: themeColors.inputText,
                                borderColor: themeColors.inputBorder,
                                borderWidth: 1
                            }}
                            onChangeText={setMonthlyContribution}
                        />
                    </View>

                    {/* Expected Return Input */}
                    <View style={{ marginVertical: 10 }}>
                        <TextInputTitle text="Expected Annual Return (%)" />
                        <TextInput
                            placeholder='10'
                            value={expectedReturn}
                            placeholderTextColor={themeColors.inputPlaceholder}
                            keyboardType='decimal-pad'
                            style={{
                                ...inputStyle.halfTextInput,
                                backgroundColor: themeColors.inputBackground,
                                color: themeColors.inputText,
                                borderColor: themeColors.inputBorder,
                                borderWidth: 1
                            }}
                            onChangeText={setExpectedReturn}
                        />
                    </View>

                    {/* Calculate Button */}
                    <CalculateButton onPress={handleCalculate} />

                    {/* Results Section */}
                    {showResults && (
                        <View style={{ marginTop: 20 }}>
                            <CalculationText />

                            {/* Summary Card */}
                            <View style={{
                                backgroundColor: themeColors.primary,
                                borderRadius: 15,
                                padding: 20,
                                marginVertical: 15,
                            }}>
                                <Text style={{
                                    color: colorScheme === 'dark' ? '#000' : '#fff',
                                    fontSize: 16,
                                    fontFamily: MM,
                                    marginBottom: 10
                                }}>
                                    Retirement Summary
                                </Text>
                                <Text style={{
                                    color: colorScheme === 'dark' ? '#000' : '#fff',
                                    fontSize: 14,
                                    fontFamily: MS,
                                    lineHeight: 22
                                }}>
                                    In {yearsToRetirement} years (at age {retirementAge}), you will have accumulated{' '}
                                    <Text style={{ fontFamily: MM, fontWeight: 'bold' }}>
                                        {CURRENCY_OPTIONS[selectedCurrencyIndex].symbol} {DecimalIn2(retirementCorpus)}
                                    </Text>{' '}
                                    for your retirement.
                                </Text>
                            </View>

                            {/* Pie Chart */}
                            <View style={{ alignItems: 'center', marginVertical: 30 }}>
                                <PieChart
                                    data1={totalContributions}
                                    data2={growthOnSavings}
                                    color1={ChartColors.principal}
                                    color2={ChartColors.profit}
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
                                            Total Invested
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                                        <View style={{
                                            width: 16,
                                            height: 16,
                                            backgroundColor: ChartColors.profit,
                                            borderRadius: 4,
                                            marginRight: 6
                                        }} />
                                        <Text style={{ color: themeColors.textSecondary, fontSize: 12, fontFamily: MS }}>
                                            Growth
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Result Cards */}
                            <ResultCard
                                title="Retirement Corpus"
                                value={retirementCorpus}
                                color={themeColors.primary}
                                subtitle={`At age ${retirementAge}`}
                            />
                            <ResultCard
                                title="Total Contributions"
                                value={totalContributions}
                                color={ChartColors.principal}
                                subtitle={`Over ${yearsToRetirement} years`}
                            />
                            <ResultCard
                                title="Growth on Investments"
                                value={growthOnSavings}
                                color={themeColors.success}
                            />

                            {/* Additional Info */}
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
                                    💡 Retirement Tips
                                </Text>
                                <Text style={{ color: themeColors.textSecondary, fontSize: 12, fontFamily: MS, lineHeight: 20 }}>
                                    • Start saving early to maximize compound growth{'\n'}
                                    • Consider inflation when planning retirement{'\n'}
                                    • Diversify your retirement portfolio{'\n'}
                                    • Review and adjust your plan annually{'\n'}
                                    • Emergency fund separate from retirement savings
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
