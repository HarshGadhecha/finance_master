import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, TextInput, Share } from 'react-native';
import Animated, { SlideInDown, SlideInRight, SlideOutDown, SlideOutLeft } from 'react-native-reanimated';
import { ButtonColor, MM, MR, MS, height, width } from '../constants/Layout';
import { calculations, CustomButton, feedbackOptions, getCurrencyIndex } from '../constants/ReUsableComponents';
import CurrencySelector from './CurrencySelector';
import SearchInput from './SearchInput';
import { Feather } from '@expo/vector-icons';
import HapticFeedback from 'react-native-haptic-feedback';

export const HomePage = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(0);

    getCurrencyIndex();
    const entering = SlideInDown.duration(800);
    const exiting = SlideOutDown.duration(800);

    const TabItem = ({ title, onPress, active }) => (
        <TouchableOpacity style={[styles.tabItem, active && styles.activeTabItem]} onPress={onPress}>
            <Text style={[styles.tabTitle, active && styles.activeTabTitle]}>{title}</Text>
        </TouchableOpacity>
    );
    // 
    const InterestScreen = () => {
        const interestCalculations = calculations.find(c => c.category === 'Interest').data;
        return (
            <Animated.FlatList
                entering={entering} exiting={exiting}
                data={interestCalculations}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <CustomButton title={item.title} image={item.image} onPress={() => navigation.navigate(item.onPress)} size={item.size} margin={item.margin} color={item.color} />
                )}
                numColumns={2}
            />
        );
    };
    // 
    const LoanScreen = () => {
        const loanCalculations = calculations.find(c => c.category === 'Loan').data;
        return (
            <Animated.FlatList
                entering={entering} exiting={exiting}
                data={loanCalculations}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <CustomButton title={item.title} image={item.image} onPress={() => navigation.navigate(item.onPress)} size={item.size} margin={item.margin} color={item.color} />
                )}
                numColumns={2}
            />
        );
    };
    // 
    const FinanceScreen = () => {
        const financeCalculations = calculations.find(c => c.category === 'Finance').data;
        return (
            <Animated.FlatList
                entering={entering} exiting={exiting}
                data={financeCalculations}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <CustomButton title={item.title} image={item.image} onPress={() => navigation.navigate(item.onPress)} size={item.size} margin={item.margin} color={item.color} />
                )}
                numColumns={2}
            />
        );
    };

    const handleTabPress = (index) => {
        HapticFeedback.trigger('impactLight', feedbackOptions);
        setActiveTab(index);
    };


    let content;
    switch (activeTab) {
        case 0:
            content = <InterestScreen />;
            break;
        case 1:
            content = <LoanScreen />;
            break;
        case 2:
            content = <FinanceScreen />;
            break;
        default:
            content = <InterestScreen />;
    }

    const shareDetails = () => {
        HapticFeedback.trigger('impactLight', feedbackOptions);
        const shareContent = `
Finance Master: 

Your All-in-One Financial Calculator 🧮💰

Simplify your financial planning with Finance Master! This powerful app offers a wide range of financial calculations to help you make informed decisions.
        
📈 Calculate Interest:
    - Simple Interest
    - Compound Interest
    - Credit Card Interest
        
💸 Manage Loans:
    - Loan Payment Calculation
    - Amortization Schedule
    - Mortgage Payment
    - Loan-to-Value Ratio
        
📊 Assess Your Finances:
    - Debt-to-Income Ratio
    - Future Value (FV)
    - Present Value (PV)
        
Whether you're planning for investments, loans, or credit card payments, Finance Master has you covered. Download the app today and take control of your financial future.
        
📱 Download now:

👉 iOS: https://apps.apple.com/tr/app/finance-master/id6448895774

👉 Android: https://play.google.com/store/apps/details?id=com.app.financeMaster

Take control of your financial future with Finance Master!
        
#FinanceMaster #FinancialCalculations #MoneyMatters`;
        Share.share({
            message: shareContent,
        });
    };

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
                    <View style={{ paddingHorizontal: 20, paddingTop: 20, backgroundColor: '#41d9a1' }}>
                        <View style={{  width: width - 40 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 10, alignContent: 'center' }}>
                                <TouchableOpacity onPress={shareDetails} style={{ marginHorizontal: 5 }}>
                                    <Feather name='share' size={24} color={'white'} style={{ padding: 10 }} />
                                </TouchableOpacity>
                                <CurrencySelector />
                            </View>
                            <Text style={{ fontSize: 26, color: 'white', fontFamily: MM, marginTop: 10 }}>Hey, what would{'\n'}you like to calculate{'\n'}today ? </Text>
                        </View>
                        <SearchInput />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 20, marginTop: 10 }}>
                        <TabItem
                            title="Interest"
                            onPress={() => handleTabPress(0)}
                            active={activeTab === 0}
                        />
                        <TabItem
                            title="Loan"
                            onPress={() => handleTabPress(1)}
                            active={activeTab === 1}
                        />
                        <TabItem
                            title="Finance"
                            onPress={() => handleTabPress(2)}
                            active={activeTab === 2}
                        />
                    </ScrollView>

                </View>
            }
            data={calculations}
            ListFooterComponent={() => (
                <View style={styles.contentContainer}>
                    {content}
                </View>
            )}
            style={{ backgroundColor: '#fff' }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    tabItem: {
        padding: 10,
        borderWidth: 0.5,
        marginHorizontal: 10,
        borderRadius: 15,
        borderColor: 'lightgrey',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    activeTabItem: {
        backgroundColor: ButtonColor,
        borderColor: ButtonColor,

    },
    tabTitle: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        fontFamily: MS,
        textTransform: 'uppercase'
    },
    activeTabTitle: {
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

});