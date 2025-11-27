import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Platform, useColorScheme } from 'react-native';
import { ButtonColor, HeadingColor, height, inputStyle, MM, MS, TextInputBackground, width } from './Layout';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HapticFeedback from 'react-native-haptic-feedback';
import Colors from './Colors';

export function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num.toString();
    } else {
        return num.toFixed(2);
    }
}
export const feedbackOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

export function DecimalIn2(num) {
    if (Number.isInteger(num)) {
        return num.toLocaleString(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 });
    } else {
        return num.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
}

export const Bold = ({ text }) => {
    return (
        <Text style={{ fontWeight: 'bold' }}>{text}</Text>
    )
}

export const ScreenTitle = ({ title }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <Text style={{ fontSize: 20, marginVertical: 20, fontFamily: MS, color: themeColors.text }}>{title} : </Text>
    );
};
export const CalculationText = () => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <Text style={{ color: themeColors.heading, fontSize: 16, marginVertical: 5, fontFamily: MS, marginBottom: 10, marginHorizontal: 10 }}>CALCULATION</Text>
    );
}
export const TextInputTitle = ({ text, c }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <View>
            <Text style={{ color: themeColors.textSecondary, fontSize: 12, marginVertical: 5, fontFamily: MS, paddingVertical: 3 }}>{text} {c} </Text>
        </View>
    )
}

export const PieText = ({ value, symbol }) => {
    return (
        <Text style={{ top: -107.5, color: 'grey', fontSize: 12, fontWeight: 'bold', width: 85, textAlign: 'center' }}>{value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{symbol == true ? ' ' + CURRENCY_OPTIONS[selectedCurrencyIndex].symbol : ' %'}</Text>
    )
}

export const BackButton = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    return (
        <View style={{ backgroundColor: themeColors.primary, alignSelf: 'flex-start', padding: 10, borderRadius: 50, marginTop: Platform.OS === 'ios' ? 0 : 10 }}>
            <TouchableOpacity onPress={() => {
                navigation.goBack()
                HapticFeedback.trigger('impactLight', feedbackOptions);
            }}>
                <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? '#000' : '#fff'} />
            </TouchableOpacity>
        </View>
    );
};

export const InputPrincipal = ({ text, value, onChangeText }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <View>
            <TextInputTitle text={text} c={'(' + CURRENCY_OPTIONS[selectedCurrencyIndex].symbol + ')'} />
            <TextInput
                placeholder='50000'
                value={value}
                placeholderTextColor={themeColors.inputPlaceholder}
                keyboardType={'number-pad'}
                style={{
                    ...inputStyle.fullTextInput,
                    backgroundColor: themeColors.inputBackground,
                    color: themeColors.inputText,
                    borderColor: themeColors.inputBorder,
                    ...inputStyle.shadowBox
                }}
                onChangeText={onChangeText}
            />
        </View>
    )
}

export const InputInterest = ({ text, value, onChangeText }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <View>
            <TextInputTitle text={text} />
            <TextInput
                placeholder='7.25'
                value={value}
                placeholderTextColor={themeColors.inputPlaceholder}
                keyboardType={'decimal-pad'}
                style={{
                    ...inputStyle.halfTextInput,
                    backgroundColor: themeColors.inputBackground,
                    color: themeColors.inputText,
                    borderColor: themeColors.inputBorder
                }}
                onChangeText={onChangeText}
            />
        </View>
    )
}

export const PieChartComponent = ({ data1, data2, symbol, text1, text2 }) => {
    return (
        <View style={{ alignItems: 'center', marginVertical: 20 }}>

        </View>
    )
}
export const TextInputTitleResult = ({ text, color }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <View>
            <Text style={{ color: color || themeColors.text, fontSize: 15, marginVertical: 5, fontFamily: MM, textTransform: 'uppercase' }}>{text}</Text>
        </View>
    )
}

const backColor = '#fca961';
export const SimpleText = ({ text, value, background }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <View style={{
            ...inputStyle.result,
            borderRadius: 10,
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.cardBorder,
            borderWidth: 1
        }}>
            <TextInputTitleResult text={text} />
            <TextInputTitleResult text={parseFloat(value).toLocaleString() + ' ' + CURRENCY_OPTIONS[selectedCurrencyIndex].symbol} />
        </View>
    )
}
//backgroundColor: background ? backColor : null,
//color={background ? 'white' : 'black'}
export const YearText = ({ text, value, background }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <View style={{
            ...inputStyle.result,
            borderRadius: 10,
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.cardBorder,
            borderWidth: 1
        }}>
            <TextInputTitleResult text={text} />
            <TextInputTitleResult text={value} />
        </View>
    )
}
export const InterestText = ({ text, value, background }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <View style={{
            ...inputStyle.result,
            borderRadius: 10,
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.cardBorder,
            borderWidth: 1
        }}>
            <TextInputTitleResult text={text} />
            <TextInputTitleResult text={value + ' %'} />
        </View>
    )
}

export const CalculateButton = ({ onPress }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
                HapticFeedback.trigger('impactLight', feedbackOptions);
                onPress()
            }} style={{ backgroundColor: themeColors.buttonPrimary, paddingVertical: 15, paddingHorizontal: 30, width: width - 40, borderRadius: 15, alignItems: 'center' }}>
                <Text style={{ color: themeColors.buttonText, fontSize: 18, fontFamily: MS }}>Calculate</Text>
            </TouchableOpacity>
        </View>
    )
}

export const ResetButton = ({ onPress }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    return (
        <View style={{ marginTop: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
                HapticFeedback.trigger('impactLight', feedbackOptions);
                onPress()
            }} style={{ backgroundColor: themeColors.buttonSecondary, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15 }}>
                <Text style={{ color: themeColors.buttonText, fontSize: 18, fontFamily: MS }}>Reset</Text>
            </TouchableOpacity>
        </View>
    )
}

export const calculations = [
    {
        category: "Interest",
        icon: "trending-up",
        data: [
            { title: "Simple \n Interest", onPress: 'SimpleInterest', size: 'large', margin: 0, color: '#4d54e1', image: require('../assets/images/extra/i1.png') },
            { title: "Compound \n Interest", onPress: 'CompoundInterest', size: 'small', margin: 0, color: '#fec505', image: require('../assets/images/extra/i2.png') },
            { title: "Credit Card \n Interest", onPress: 'CreditCardInterest', size: 'small', margin: 0, color: '#ff5668', image: require('../assets/images/extra/i3.png') },
            { title: "Recurring \n Deposite", onPress: 'RecurringDeposit', size: 'large', margin: -30, color: '#41d5e2', image: require('../assets/images/extra/i4.png') },
        ]
    },
    {
        category: "Loan",
        icon: "credit-card",
        data: [
            { title: "Loan \n Payment", onPress: 'LoanPayment', size: 'large', margin: 0, color: '#4d54e1', image: require('../assets/images/extra/l1.png') },
            { title: "Amortization \nSchedule", onPress: 'AmortisationCalculator', size: 'small', margin: 0, color: '#41d5e2', image: require('../assets/images/extra/l2.png') },
            { title: "Mortgage \nPayment", onPress: 'MortgagePayment', size: 'small', margin: 0, color: '#fec505', image: require('../assets/images/extra/l3.png') },
            { title: "Loan To Value \nRatio", onPress: 'LoanToValueRatio', size: 'large', margin: -30, color: '#ff5668', image: require('../assets/images/extra/l4.png') },
            { title: "Car Loan \nEMI", onPress: 'CarLoanEMI', size: 'small', margin: 0, color: '#4d54e1', image: require('../assets/images/extra/l1.png') },
            { title: "Home \nAffordability", onPress: 'HomeAffordability', size: 'small', margin: 0, color: '#41d5e2', image: require('../assets/images/extra/l2.png') },
        ]
    },
    {
        category: "Investment",
        icon: "bar-chart",
        data: [
            { title: "SIP \nCalculator", onPress: 'SIPCalculator', size: 'large', margin: 0, color: '#41d9a1', image: require('../assets/images/extra/f3.png') },
            { title: "Lumpsum \nInvestment", onPress: 'LumpsumInvestment', size: 'small', margin: 0, color: '#4d54e1', image: require('../assets/images/extra/f4.png') },
            { title: "SWP \nCalculator", onPress: 'SWPCalculator', size: 'small', margin: 0, color: '#fec505', image: require('../assets/images/extra/f1.png') },
            { title: "CAGR \nCalculator", onPress: 'CAGRCalculator', size: 'large', margin: -30, color: '#ff5668', image: require('../assets/images/extra/f2.png') },
        ]
    },
    {
        category: "Tax",
        icon: "file-text",
        data: [
            { title: "Income Tax \nCalculator", onPress: 'IncomeTaxCalculator', size: 'large', margin: 0, color: '#ff5668', image: require('../assets/images/extra/f1.png') },
            { title: "GST \nCalculator", onPress: 'GSTCalculator', size: 'small', margin: 0, color: '#fec505', image: require('../assets/images/extra/f2.png') },
            { title: "HRA \nCalculator", onPress: 'HRACalculator', size: 'small', margin: 0, color: '#41d5e2', image: require('../assets/images/extra/f3.png') },
            { title: "Capital Gains \nTax", onPress: 'CapitalGainsTax', size: 'large', margin: -30, color: '#4d54e1', image: require('../assets/images/extra/f4.png') },
        ]
    },
    {
        category: "Business",
        icon: "briefcase",
        data: [
            { title: "Profit Margin \nCalculator", onPress: 'ProfitMargin', size: 'large', margin: 0, color: '#4d54e1', image: require('../assets/images/extra/f1.png') },
            { title: "ROI \nCalculator", onPress: 'ROICalculator', size: 'small', margin: 0, color: '#41d9a1', image: require('../assets/images/extra/f2.png') },
            { title: "Break-even \nPoint", onPress: 'BreakEven', size: 'small', margin: 0, color: '#ff5668', image: require('../assets/images/extra/f3.png') },
            { title: "Discount \nCalculator", onPress: 'DiscountCalculator', size: 'large', margin: -30, color: '#fec505', image: require('../assets/images/extra/f4.png') },
        ]
    },
    {
        category: "Planning",
        icon: "target",
        data: [
            { title: "Retirement \nPlanner", onPress: 'RetirementPlanner', size: 'large', margin: 0, color: '#41d5e2', image: require('../assets/images/extra/f1.png') },
            { title: "Education \nPlanner", onPress: 'EducationPlanner', size: 'small', margin: 0, color: '#4d54e1', image: require('../assets/images/extra/f2.png') },
            { title: "Emergency \nFund", onPress: 'EmergencyFund', size: 'small', margin: 0, color: '#fec505', image: require('../assets/images/extra/f3.png') },
            { title: "Goal \nPlanner", onPress: 'GoalPlanner', size: 'large', margin: -30, color: '#ff5668', image: require('../assets/images/extra/f4.png') },
        ]
    },
    {
        category: "Real Estate",
        icon: "home",
        data: [
            { title: "Rent vs \nBuy", onPress: 'RentVsBuy', size: 'large', margin: 0, color: '#fec505', image: require('../assets/images/extra/f1.png') },
            { title: "Rental Yield \nCalculator", onPress: 'RentalYield', size: 'small', margin: 0, color: '#41d5e2', image: require('../assets/images/extra/f2.png') },
            { title: "Property \nAppreciation", onPress: 'PropertyAppreciation', size: 'small', margin: 0, color: '#4d54e1', image: require('../assets/images/extra/f3.png') },
            { title: "Stamp Duty \nCalculator", onPress: 'StampDuty', size: 'large', margin: -30, color: '#ff5668', image: require('../assets/images/extra/f4.png') },
        ]
    },
    {
        category: "Finance",
        icon: "dollar-sign",
        data: [
            { title: "Debt To Income \nRatio", onPress: 'DTI', size: 'large', margin: 0, color: '#41d5e2', image: require('../assets/images/extra/f1.png') },
            { title: "Future Value\n (FV)", onPress: 'FV', size: 'small', margin: 0, color: '#fec505', image: require('../assets/images/extra/f3.png') },
            { title: "Present Value \n(PV)", onPress: 'PV', size: 'small', margin: 0, color: '#4d54e1', image: require('../assets/images/extra/f4.png') },
        ]
    },
];

export const seachArray = [
    {
        category: "Interest",
        data: [
            { title: "Simple Interest Calculator", onPress: 'SimpleInterest' },
            { title: "Compound Interest Calculator", onPress: 'CompoundInterest' },
            { title: "Credit Card Interest Calculator", onPress: 'CreditCardInterest' },
            { title: "Recurring Deposite Calculator", onPress: 'RecurringDeposit' },
        ]
    },
    {
        category: "Loan",
        data: [
            { title: "Loan Payment Calculator", onPress: 'LoanPayment' },
            { title: "Amortization Schedule Calculator", onPress: 'AmortisationCalculator' },
            { title: "Mortgage Payment Calculator", onPress: 'MortgagePayment' },
            { title: "Loan to Value Ratio Calculator", onPress: 'LoanToValueRatio' },
            { title: "Car Loan EMI Calculator", onPress: 'CarLoanEMI' },
            { title: "Home Affordability Calculator", onPress: 'HomeAffordability' },
        ]
    },
    {
        category: "Investment",
        data: [
            { title: "SIP Calculator", onPress: 'SIPCalculator' },
            { title: "Lumpsum Investment Calculator", onPress: 'LumpsumInvestment' },
            { title: "SWP Calculator", onPress: 'SWPCalculator' },
            { title: "CAGR Calculator", onPress: 'CAGRCalculator' },
        ]
    },
    {
        category: "Tax",
        data: [
            { title: "Income Tax Calculator", onPress: 'IncomeTaxCalculator' },
            { title: "GST Calculator", onPress: 'GSTCalculator' },
            { title: "HRA Calculator", onPress: 'HRACalculator' },
            { title: "Capital Gains Tax Calculator", onPress: 'CapitalGainsTax' },
        ]
    },
    {
        category: "Business",
        data: [
            { title: "Profit Margin Calculator", onPress: 'ProfitMargin' },
            { title: "ROI Calculator", onPress: 'ROICalculator' },
            { title: "Break-even Point Calculator", onPress: 'BreakEven' },
            { title: "Discount Calculator", onPress: 'DiscountCalculator' },
        ]
    },
    {
        category: "Planning",
        data: [
            { title: "Retirement Planner", onPress: 'RetirementPlanner' },
            { title: "Education Planner", onPress: 'EducationPlanner' },
            { title: "Emergency Fund Calculator", onPress: 'EmergencyFund' },
            { title: "Goal Planner", onPress: 'GoalPlanner' },
        ]
    },
    {
        category: "Real Estate",
        data: [
            { title: "Rent vs Buy Calculator", onPress: 'RentVsBuy' },
            { title: "Rental Yield Calculator", onPress: 'RentalYield' },
            { title: "Property Appreciation Calculator", onPress: 'PropertyAppreciation' },
            { title: "Stamp Duty Calculator", onPress: 'StampDuty' },
        ]
    },
    {
        category: "Finance",
        data: [
            { title: "Debt to Income Ratio Calculator", onPress: 'DTI' },
            { title: "Future Value (FV) Calculator", onPress: 'FV' },
            { title: "Present Value (PV) Calculator", onPress: 'PV' },
        ]
    },
];

export const CURRENCY_OPTIONS = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr.' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: '$' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: '$' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: '$' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
];

export const CURRENCY_CODES = CURRENCY_OPTIONS.map(option => (option.symbol + '   ' + option.code));
export const selectedCurrencyIndex = [0];

export const getCurrencyIndex = async () => {
    const index = await AsyncStorage.getItem('selectedCurrencyIndex');
    if (index) {
        selectedCurrencyIndex[0] = index;
        console.log(index);
    } else {
        selectedCurrencyIndex[0] = 0; // default to first currency if no currency is selected yet
    }
    console.log(selectedCurrencyIndex[0]);
}

export const CustomButton = ({ title, onPress, size, margin, color, image }) => {
    return (
        <TouchableOpacity onPress={() => {
            HapticFeedback.trigger('impactLight', feedbackOptions);
            onPress()
        }} style={{ borderRadius: 25, height: size == 'large' ? 250 : 220, width: width / 2 - 35, margin: 10, marginTop: margin, alignItems: 'center', backgroundColor: color }}>
            <ImageBackground source={image} style={{ height: size == 'large' ? 250 : 220, width: width / 2 - 35, justifyContent: 'flex-end', alignItems: 'center' }} borderRadius={25} resizeMode={'contain'} >
                <View style={{ padding: 5, borderBottomEndRadius: 25, borderBottomStartRadius: 25, backgroundColor: 'rgba(0,0,0,0.15)', width: width / 2 - 35 }}>
                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontFamily: MS }} >{title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

export const entering = SlideInDown.duration(800);
export const exiting = SlideOutDown.duration(800);