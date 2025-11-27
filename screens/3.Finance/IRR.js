import React, { useState } from 'react';
import { Text, ScrollView, Keyboard, TouchableWithoutFeedback, StyleSheet, View, SafeAreaView, Button, TextInput, Alert } from 'react-native';
import Animated from 'react-native-reanimated';
import { TextInputBackground } from '../../constants/Layout';
import { BackButton, CalculateButton, entering, exiting, InputInterest, InputPrincipal, ResetButton, SimpleText } from '../../constants/ReUsableComponents';
import finance from 'financejs';
import { ComingSoon } from '../ComingSoon';
import { AdBanner, LoadInterstitial, LoadRewardedInterstitial, interstitial, rewardedInterstitial } from '../../constants/AdMob';
import { StatusBar } from 'expo-status-bar';

export const IRR = ({ navigation }) => {
    LoadInterstitial();
    LoadRewardedInterstitial();

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar style='dark' />
            <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={{ flex: 1 }}>
                        <BackButton />
                        <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>Internal Rate Of Return Calculation : </Text>
                        <ComingSoon />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <AdBanner />
        </SafeAreaView>

    );
}