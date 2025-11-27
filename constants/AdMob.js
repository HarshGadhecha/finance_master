import { View, Text, Platform } from 'react-native';
import { TextInputBackground, width } from './Layout';
import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, RewardedAdEventType, RewardedInterstitialAd, TestIds, mobileAds } from 'react-native-google-mobile-ads';
import { useState } from 'react';

const Interstitial_App_Id = __DEV__ ? TestIds.INTERSTITIAL : Platform.OS === 'ios' ? 'ca-app-pub-2586473739778438/2741325748' : 'ca-app-pub-2586473739778438/4866003582';
const RewardedInterstitial_App_Id = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : Platform.OS === 'ios' ? 'ca-app-pub-2586473739778438/5691718878' : 'ca-app-pub-2586473739778438/3651363952';
const NativeLook = __DEV__ ? TestIds.GAM_NATIVE : Platform.OS === 'ios' ? 'ca-app-pub-2586473739778438/6462464745' : 'ca-app-pub-2586473739778438/1867508992';
const Banner_App_Id = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? 'ca-app-pub-2586473739778438/9966005805' : 'ca-app-pub-2586473739778438/6973292172';

export const interstitial = InterstitialAd.createForAdRequest(Interstitial_App_Id, { requestNonPersonalizedAdsOnly: true });
export const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(RewardedInterstitial_App_Id, { requestNonPersonalizedAdsOnly: true, keywords: ['fashion', 'finance'], });

export const ShowInterstitial = () => {
    try {
        interstitial.show();
    } catch (error) {

    }
}

export const ShowRewardedInterstitial = () => {
    try {
        rewardedInterstitial.show();
    } catch (error) {

    }
}
export const LoadInterstitial = () => {
    const [interstitialLoaded, setInterstitialLoaded] = useState(false);

    const loadInterstatial = () => {
        const unsubScribedLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED, () => { setInterstitialLoaded(true) }
        );

        const unsubScribedClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED, () => { setInterstitialLoaded(false); interstitial.load(); }
        );
        interstitial.load();

        return () => {
            unsubScribedClosed();
            unsubScribedLoaded();
        }
    }

    loadInterstatial();
}

export const LoadRewardedInterstitial = () => {
    const [rewardedinterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);

    const loadRewardedInterstitial = () => {
        const unsubScribedLoaded = rewardedInterstitial.addAdEventListener(
            RewardedAdEventType.LOADED, () => { setRewardedInterstitialLoaded(true) }
        );

        const unsubScribedEarned = rewardedInterstitial.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD, () => { console.log('Rewared Earned') }
        );
        const unsubScribedClosed = rewardedInterstitial.addAdEventListener(
            AdEventType.CLOSED, () => { setRewardedInterstitialLoaded(false); rewardedInterstitial.load(); }
        );
        rewardedInterstitial.load();

        return () => {
            unsubScribedLoaded();
            unsubScribedEarned();
            unsubScribedClosed();
        }
    }
    loadRewardedInterstitial();
}

export const Adaptive_Banner = () => {
    return (
        <View style={{ position: 'absolute', bottom:  0, width: width, justifyContent: 'center', alignItems: 'center' }}>
            <BannerAd
                unitId={Banner_App_Id}
                size={BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                    networkExtras: {
                        collapsible: 'bottom'
                    }
                }}
            />
        </View>
    )
}

export const AdBanner = () => {
    return (
        <View style={{ position: 'absolute', bottom: 0, width: width, justifyContent: 'center', alignItems: 'center' }}>
            <BannerAd
                unitId={Banner_App_Id}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                    networkExtras: {
                        collapsible: 'bottom'
                    }
                }}
            />
        </View>
    )
}

