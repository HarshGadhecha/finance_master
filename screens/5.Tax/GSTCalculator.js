import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, useColorScheme, Platform } from 'react-native';
import { BackButton, CalculateButton, ResetButton, TextInputTitle, StyledInput, feedbackOptions, CURRENCY_OPTIONS, selectedCurrencyIndex, DecimalIn2, CalculationText } from '../../constants/ReUsableComponents';
import { height, width, inputStyle, MM, MS } from '../../constants/Layout';
import Colors from '../../constants/Colors';
import SegmentControl from '../SegmentControl';
import { AdBanner } from '../../constants/AdMob';
import HapticFeedback from 'react-native-haptic-feedback';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GSTCalculator() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const [amount, setAmount] = useState('');
    const [gstRate, setGstRate] = useState('18');
    const [calculationType, setCalculationType] = useState('Exclusive'); // Exclusive or Inclusive

    // Results
    const [baseAmount, setBaseAmount] = useState(0);
    const [gstAmount, setGstAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleCalculate = () => {
        if (!amount || !gstRate) {
            alert('Please fill all fields');
            return;
        }

        const amountValue = parseFloat(amount);
        const rate = parseFloat(gstRate) / 100;

        if (amountValue <= 0 || rate < 0) {
            alert('Please enter valid numbers');
            return;
        }

        let base, gst, total;

        if (calculationType === 'Exclusive') {
            // Amount entered is before GST
            base = amountValue;
            gst = base * rate;
            total = base + gst;
        } else {
            // Amount entered is after GST (inclusive)
            total = amountValue;
            base = total / (1 + rate);
            gst = total - base;
        }

        setBaseAmount(base);
        setGstAmount(gst);
        setTotalAmount(total);
        setShowResults(true);

        HapticFeedback.trigger('notificationSuccess', feedbackOptions);
    };

    const handleReset = () => {
        setAmount('');
        setGstRate('18');
        setCalculationType('Exclusive');
        setBaseAmount(0);
        setGstAmount(0);
        setTotalAmount(0);
        setShowResults(false);
        HapticFeedback.trigger('impactLight', feedbackOptions);
    };

    const GSTRateButton = ({ rate, onPress }) => (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: gstRate === rate ? themeColors.primary : themeColors.cardBackground,
                borderRadius: 10,
                padding: 15,
                marginHorizontal: 5,
                marginVertical: 5,
                minWidth: 70,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: gstRate === rate ? themeColors.primary : themeColors.cardBorder,
            }}
        >
            <Text style={{
                color: gstRate === rate ? (colorScheme === 'dark' ? '#000' : '#fff') : themeColors.text,
                fontSize: 16,
                fontFamily: MS,
                fontWeight: 'bold'
            }}>
                {rate}%
            </Text>
        </TouchableOpacity>
    );

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
                        GST Calculator
                    </Text>

                    <Text style={{
                        fontSize: 14,
                        fontFamily: MS,
                        color: themeColors.textSecondary,
                        marginBottom: 20,
                        lineHeight: 20
                    }}>
                        Calculate GST (Goods and Services Tax) on your products or services.
                        Choose between GST exclusive or inclusive calculation.
                    </Text>

                    {/* Calculation Type Selector */}
                    <View style={{ marginVertical: 15 }}>
                        <TextInputTitle text="Calculation Type" />
                        <SegmentControl
                            values={['Exclusive', 'Inclusive']}
                            selectedIndex={calculationType === 'Exclusive' ? 0 : 1}
                            onChange={(index) => {
                                setCalculationType(index === 0 ? 'Exclusive' : 'Inclusive');
                            }}
                        />
                        <Text style={{
                            fontSize: 12,
                            fontFamily: MS,
                            color: themeColors.textSecondary,
                            marginTop: 8,
                            fontStyle: 'italic'
                        }}>
                            {calculationType === 'Exclusive'
                                ? 'Amount entered is before GST'
                                : 'Amount entered includes GST'}
                        </Text>
                    </View>

                    {/* Amount Input */}
                    <View style={{ marginVertical: 10 }}>
                        <StyledInput
                            label={calculationType === 'Exclusive' ? 'Amount (Before GST)' : 'Amount (Including GST)'}
                            value={amount}
                            onChangeText={setAmount}
                            placeholder='10000'
                            keyboardType='number-pad'
                            width='full'
                            showCurrency={true}
                            withShadow={true}
                        />
                    </View>

                    {/* GST Rate Quick Select */}
                    <View style={{ marginVertical: 15 }}>
                        <TextInputTitle text="Common GST Rates" />
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            marginTop: 10
                        }}>
                            <GSTRateButton rate="0" onPress={() => { setGstRate('0'); HapticFeedback.trigger('impactLight', feedbackOptions); }} />
                            <GSTRateButton rate="5" onPress={() => { setGstRate('5'); HapticFeedback.trigger('impactLight', feedbackOptions); }} />
                            <GSTRateButton rate="12" onPress={() => { setGstRate('12'); HapticFeedback.trigger('impactLight', feedbackOptions); }} />
                            <GSTRateButton rate="18" onPress={() => { setGstRate('18'); HapticFeedback.trigger('impactLight', feedbackOptions); }} />
                            <GSTRateButton rate="28" onPress={() => { setGstRate('28'); HapticFeedback.trigger('impactLight', feedbackOptions); }} />
                        </View>
                    </View>

                    {/* Custom GST Rate Input */}
                    <View style={{ marginVertical: 10 }}>
                        <StyledInput
                            label="Custom GST Rate (%)"
                            value={gstRate}
                            onChangeText={setGstRate}
                            placeholder='18'
                            keyboardType='decimal-pad'
                            width='half'
                            withShadow={true}
                        />
                    </View>

                    {/* Calculate Button */}
                    <CalculateButton onPress={handleCalculate} />

                    {/* Results Section */}
                    {showResults && (
                        <View style={{ marginTop: 20 }}>
                            <CalculationText />

                            {/* Result Cards */}
                            <ResultCard
                                title="Base Amount (Before GST)"
                                value={baseAmount}
                                color={themeColors.heading}
                            />
                            <ResultCard
                                title={`GST Amount (${gstRate}%)`}
                                value={gstAmount}
                                color={themeColors.info}
                            />
                            <ResultCard
                                title="Total Amount (Including GST)"
                                value={totalAmount}
                                color={themeColors.primary}
                            />

                            {/* Breakdown Info */}
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
                                    GST Breakdown
                                </Text>
                                {parseFloat(gstRate) > 0 && (
                                    <>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <Text style={{ color: themeColors.textSecondary, fontSize: 14, fontFamily: MS }}>
                                                CGST ({parseFloat(gstRate) / 2}%)
                                            </Text>
                                            <Text style={{ color: themeColors.text, fontSize: 14, fontFamily: MM }}>
                                                {CURRENCY_OPTIONS[selectedCurrencyIndex].symbol} {DecimalIn2(gstAmount / 2)}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: themeColors.textSecondary, fontSize: 14, fontFamily: MS }}>
                                                SGST ({parseFloat(gstRate) / 2}%)
                                            </Text>
                                            <Text style={{ color: themeColors.text, fontSize: 14, fontFamily: MM }}>
                                                {CURRENCY_OPTIONS[selectedCurrencyIndex].symbol} {DecimalIn2(gstAmount / 2)}
                                            </Text>
                                        </View>
                                    </>
                                )}
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
