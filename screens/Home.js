import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useColorScheme, SafeAreaView } from 'react-native';
import { MM, MS, width } from '../constants/Layout';
import { calculations, CustomButton, getCurrencyIndex } from '../constants/ReUsableComponents';
import CurrencySelector from './CurrencySelector';
import Colors from '../constants/Colors';

export const HomePage = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    getCurrencyIndex();

    const CategorySection = ({ category, data }) => (
        <View style={{ marginBottom: 30 }}>
            <Text style={{
                fontSize: 18,
                fontFamily: MM,
                color: themeColors.text,
                marginBottom: 15,
                marginLeft: 10,
                fontWeight: 'bold'
            }}>
                {category}
            </Text>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
                {data.map((item, index) => (
                    <CustomButton
                        key={index}
                        title={item.title}
                        image={item.image}
                        onPress={() => navigation.navigate(item.onPress)}
                        size={item.size}
                        margin={item.margin}
                        color={item.color}
                    />
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 25,
                    backgroundColor: themeColors.primary,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 28,
                            color: colorScheme === 'dark' ? '#000' : '#fff',
                            fontFamily: MM,
                            fontWeight: 'bold'
                        }}>
                            Finance Master
                        </Text>
                        <CurrencySelector />
                    </View>
                </View>

                {/* Calculator Sections */}
                <View style={{ paddingHorizontal: 10, paddingTop: 25, paddingBottom: 30 }}>
                    {calculations.map((calc, index) => (
                        <CategorySection
                            key={index}
                            category={calc.category}
                            data={calc.data}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
});