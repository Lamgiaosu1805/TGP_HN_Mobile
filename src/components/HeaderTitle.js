import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HeaderTitle(props) {
    const headerTitle = props.headerTitle.toString().toUpperCase();
    return (
    <View style={styles.container}>
        <Text style={styles.title}>{headerTitle}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff7e7',
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 8,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#05a5de'
    }
})