import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LogoTitle() {
  return (
    <View style={{
        paddingHorizontal: 20,
        flexDirection: 'row',
    }}>
        <Image source={{uri: "https://www.tonggiaophanhanoi.org/wp-content/uploads/2020/12/logo_150.png"}} style={{width: 80, height: 85}}/>
        <View style={styles.textLogo}>
            <Text style={styles.textLogo_1}>Tổng Giáo Phận Hà Nội</Text>
            <Text style={styles.textLogo_2}>Archdiocese of Ha Noi</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    textLogo: {
        marginLeft: 12,
        flex: 1,
        justifyContent:'center',
    },
    textLogo_1: {
        color: '#f70303',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 2,
        fontFamily: "Times New Roman"
    },
    textLogo_2: {
        color: '#ea8203',
        fontSize: 18
    }
})