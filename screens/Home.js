import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, TextInput, Share, useColorScheme, SafeAreaView } from 'react-native';
import Animated, { SlideInDown, SlideInRight, SlideOutDown, SlideOutLeft } from 'react-native-reanimated';
import { ButtonColor, MM, MR, MS, height, width } from '../constants/Layout';
import { calculations, CustomButton, feedbackOptions, getCurrencyIndex } from '../constants/ReUsableComponents';
import CurrencySelector from './CurrencySelector';
import SearchInput from './SearchInput';
import { Feather } from '@expo/vector-icons';
import HapticFeedback from 'react-native-haptic-feedback';
import Colors from '../constants/Colors';

export const HomePage = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(0);
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    getCurrencyIndex();
    const entering = SlideInDown.duration(800);
    const exiting = SlideOutDown.duration(800);

    const TabItem = ({ title, onPress, active }) => (
        <TouchableOpacity
            style={[
                styles.tabItem,
                {
                    backgroundColor: active ? themeColors.primary : themeColors.cardBackground,
                    borderColor: active ? themeColors.primary : themeColors.cardBorder,
                }
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.tabTitle,
                { color: active ? (colorScheme === 'dark' ? '#000' : '#fff') : themeColors.textSecondary }
            ]}>{title}</Text>
        </TouchableOpacity>
    );

    const renderCategoryScreen = (categoryName) => {
        const categoryData = calculations.find(c => c.category === categoryName);
        if (!categoryData) return null;

        return (
            <Animated.FlatList
                entering={entering}
                exiting={exiting}
                data={categoryData.data}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <CustomButton
                        title={item.title}
                        image={item.image}
                        onPress={() => navigation.navigate(item.onPress)}
                        size={item.size}
                        margin={item.margin}
                        color={item.color}
                    />
                )}
                numColumns={2}
            />
        );
    };

    const handleTabPress = (index) => {
        HapticFeedback.trigger('impactLight', feedbackOptions);
        setActiveTab(index);
    };

    const categories = calculations.map(c => c.category);

    let content;
    if (activeTab < categories.length) {
        content = renderCategoryScreen(categories[activeTab]);
    } else {
        content = renderCategoryScreen(categories[0]);
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
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {/* Header Section */}
                <View style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 30,
                    backgroundColor: themeColors.primary,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                }}>
                    {/* Top Bar */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 20
                    }}>
                        <Text style={{
                            fontSize: 24,
                            color: colorScheme === 'dark' ? '#000' : '#fff',
                            fontFamily: MM,
                            fontWeight: 'bold'
                        }}>
                            Finance Master
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={shareDetails} style={{ marginRight: 10 }}>
                                <Feather
                                    name='share-2'
                                    size={22}
                                    color={colorScheme === 'dark' ? '#000' : '#fff'}
                                />
                            </TouchableOpacity>
                            <CurrencySelector />
                        </View>
                    </View>

                    {/* Greeting */}
                    <Text style={{
                        fontSize: 16,
                        color: colorScheme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
                        fontFamily: MS,
                        marginBottom: 15
                    }}>
                        What would you like to calculate today?
                    </Text>

                    {/* Search Bar */}
                    <SearchInput />
                </View>

                {/* Category Tabs */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        paddingVertical: 20,
                        backgroundColor: themeColors.background
                    }}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                >
                    {categories.map((category, index) => (
                        <TabItem
                            key={category}
                            title={category}
                            onPress={() => handleTabPress(index)}
                            active={activeTab === index}
                        />
                    ))}
                </ScrollView>

                {/* Calculator Grid */}
                <View style={{
                    paddingHorizontal: 10,
                    paddingBottom: 30,
                    backgroundColor: themeColors.background
                }}>
                    {content}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    tabItem: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginHorizontal: 6,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tabTitle: {
        fontSize: 13,
        textAlign: 'center',
        fontFamily: MS,
        fontWeight: '600',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});