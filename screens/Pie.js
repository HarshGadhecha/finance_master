import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { MR, MS } from '../constants/Layout';
import { CURRENCY_OPTIONS, DecimalIn2, selectedCurrencyIndex } from '../constants/ReUsableComponents';

const PieChart = ({ principal, interest, data1, data2 }) => {
    const radius = 70;
    const circleCircumference = 2 * Math.PI * radius;

    const total = parseFloat(principal) + parseFloat(interest);

    const principalPercentage = (principal / total) * 100;
    const interestPercentage = (interest / total) * 100;

    const principalStrokeDashoffset =
        circleCircumference - (circleCircumference * principalPercentage) / 100;
    const interestStrokeDashoffset =
        circleCircumference - (circleCircumference * interestPercentage) / 100;

    const principalAngle = (principal / total) * 360;

    return (
        <View style={styles.container}>
            <View style={styles.graphWrapper}>
                <Svg height="200" width="200" viewBox="0 0 180 180">
                    <G rotation={-90} originX="90" originY="90">
                        {total === 0 ? (
                            <Circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#F1F6F9"
                                fill="transparent"
                                strokeWidth="40"
                            />
                        ) : (
                            <>
                                <Circle
                                    cx="50%"
                                    cy="50%"
                                    r={radius}
                                    stroke="#90dcc4"
                                    fill="transparent"
                                    strokeWidth="40"
                                    strokeDasharray={circleCircumference}
                                    strokeDashoffset={principalStrokeDashoffset}
                                    rotation={0}
                                    originX="90"
                                    originY="90"
                                    strokeLinecap="round"
                                />
                                <Circle
                                    cx="50%"
                                    cy="50%"
                                    r={radius}
                                    stroke="#fca961"
                                    fill="transparent"
                                    strokeWidth="40"
                                    strokeDasharray={circleCircumference}
                                    strokeDashoffset={interestStrokeDashoffset}
                                    rotation={principalAngle}
                                    originX="90"
                                    originY="90"
                                    strokeLinecap="round"
                                />
                            </>
                        )
                        }
                    </G>
                </Svg>
                <Text style={styles.label}>{CURRENCY_OPTIONS[selectedCurrencyIndex].symbol + ' ' + DecimalIn2(total)}</Text>

            </View>
            <View style={styles.labelContainer}>
                <Text style={[styles.label2, { color: "#90dcc4" }]}>{data1 == null ? 'Principal' : data1}</Text>
                <Text> /  </Text>
                <Text style={[styles.label2, { color: "#fca961" }]}>{data2 == null ? 'Interest' : data2}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    graphWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    labelContainer: {
        flexDirection: "row",
        marginVertical: 30
    },
    label: {
        position: "absolute",
        textAlign: "center",
        fontSize: 14,
        fontFamily: MS
    },
    label2: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: MS,
        marginRight: 5,
    },
});

export default PieChart;
