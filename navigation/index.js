/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Platform } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

// Interest Calculators
import { AmortisationCalculator } from '../screens/2.Loan/AmortizationSchedule';
import { SimpleInterest } from '../screens/1.Interest/simpleInterest';
import { CompoundInterest } from '../screens/1.Interest/compoundInterest';
import { RecurringDeposit } from '../screens/1.Interest/RecurringDeposit';
import { CreditCardInterest } from '../screens/1.Interest/CreditCardInterest';

// Loan Calculators
import { LoanCalculator } from '../screens/2.Loan/LoanCalculator';
import { LoanToValueRatio } from '../screens/2.Loan/LoanToValue';
import { MortgagePayment } from '../screens/2.Loan/MortgagePayment';

// Finance Calculators
import { DTI } from '../screens/3.Finance/DTI';
import { PV } from '../screens/3.Finance/PV';
import { FV } from '../screens/3.Finance/FV';

// Investment Calculators
import SIPCalculator from '../screens/4.Investment/SIPCalculator';
import LumpsumInvestment from '../screens/4.Investment/LumpsumInvestment';

// Tax Calculators
import GSTCalculator from '../screens/5.Tax/GSTCalculator';
import IncomeTaxCalculator from '../screens/5.Tax/IncomeTaxCalculator';

// Planning Calculators
import RetirementPlanner from '../screens/7.Planning/RetirementPlanner';

// Other
import { HomePage } from '../screens/Home';
import { RootStackParamList, RootTabParamList } from '../types';
import { StatusBar } from 'expo-status-bar';

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style='dark' />
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />

      {/* Interest Calculators */}
      <Stack.Screen name="SimpleInterest" component={SimpleInterest} />
      <Stack.Screen name="RecurringDeposit" component={RecurringDeposit} />
      <Stack.Screen name="CompoundInterest" component={CompoundInterest} />
      <Stack.Screen name="CreditCardInterest" component={CreditCardInterest} />

      {/* Loan Calculators */}
      <Stack.Screen name="LoanPayment" component={LoanCalculator} />
      <Stack.Screen name="AmortisationCalculator" component={AmortisationCalculator} />
      <Stack.Screen name="LoanToValueRatio" component={LoanToValueRatio} />
      <Stack.Screen name="MortgagePayment" component={MortgagePayment} />

      {/* Investment Calculators */}
      <Stack.Screen name="SIPCalculator" component={SIPCalculator} />
      <Stack.Screen name="LumpsumInvestment" component={LumpsumInvestment} />

      {/* Tax Calculators */}
      <Stack.Screen name="IncomeTaxCalculator" component={IncomeTaxCalculator} />
      <Stack.Screen name="GSTCalculator" component={GSTCalculator} />

      {/* Planning Calculators */}
      <Stack.Screen name="RetirementPlanner" component={RetirementPlanner} />

      {/* Finance Calculators */}
      <Stack.Screen name="DTI" component={DTI} />
      <Stack.Screen name="PV" component={PV} />
      <Stack.Screen name="FV" component={FV} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomePage}
        options={({ navigation }) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        })}
      />
      <BottomTab.Screen
        name="Loan"
        component={CompoundInterest}
        options={{
          title: 'Compound Interest',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Finnance"
        component={LoanCalculator}
        options={{
          title: 'Loan Calc',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
