import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import * as cheerio from 'cheerio';
import LogoTitle from '../components/logo';

export default function HocGiaoLy() {
    return (
        <View style={styles.container}>
            <LogoTitle />
            <Image 
                source={{uri: "https://www.tonggiaophanhanoi.org/wp-content/uploads/2023/03/Banner.jpg"}}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={{textAlign: 'center'}}>Học Hỏi Giáo Lý Kinh Thánh</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 320 / 2048
    }
})