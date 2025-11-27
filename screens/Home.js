import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, Platform, StatusBar } from 'react-native';
import { MM, MS } from '../constants/Layout';
import { calculations, CustomButton, getCurrencyIndex } from '../constants/ReUsableComponents';
import CurrencySelector from './CurrencySelector';
import Colors from '../constants/Colors';

export const HomePage = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    getCurrencyIndex();

    const CategorySection = ({ category, data }) => (
        <View style={{ marginBottom: 25 }}>
            <Text style={{
                fontSize: 18,
                fontFamily: MM,
                color: themeColors.text,
                marginBottom: 12,
                marginLeft: 15,
                fontWeight: 'bold'
            }}>
                {category}
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15, paddingRight: 5 }}
            >
                {data.map((item, index) => (
                    <CustomButton
                        key={index}
                        title={item.title}
                        image={item.image}
                        onPress={() => navigation.navigate(item.onPress)}
                        color={item.color}
                    />
                ))}
            </ScrollView>
        </View>
    );

    return (
        <View style={{
            flex: 1,
            backgroundColor: themeColors.background,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}>
            {/* Fixed Header */}
            <View style={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 20,
                backgroundColor: themeColors.primary,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 30
                }}>
                    <Text style={{
                        fontSize: 26,
                        color: colorScheme === 'dark' ? '#000' : '#fff',
                        fontFamily: MM,
                        fontWeight: 'bold'
                    }}>
                        Finance Master
                    </Text>
                    <CurrencySelector />
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                <View style={{ paddingTop: 20, paddingBottom: 30 }}>
                    {calculations.map((calc, index) => (
                        <CategorySection
                            key={index}
                            category={calc.category}
                            data={calc.data}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
});