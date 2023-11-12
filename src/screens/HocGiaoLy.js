import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import * as cheerio from 'cheerio';
import LogoTitle from '../components/logo';

export default function HocGiaoLy() {
    const [optionSelected, setOptionSelected] = useState(1)
    const selectOption = (option) => {
        setOptionSelected(option)
    }
    return (
        <View style={styles.container}>
            <LogoTitle />
            <Image 
                source={{uri: "https://www.tonggiaophanhanoi.org/wp-content/uploads/2023/03/Banner.jpg"}}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '500'
                }}>
                    Học Hỏi Giáo Lý Kinh Thánh
                </Text>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '500',
                    marginTop: 8
                }}>
                    Tin Mừng Theo Thánh Mattheu
                </Text>
                <View style={styles.options}>
                    <TouchableOpacity onPress={() => selectOption(1)} activeOpacity={1}>
                        <Text style={[styles.optionText, {color: optionSelected === 1 ? 'red' : 'black'}]}>
                            Bài Học
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectOption(2)} activeOpacity={1}>
                        <Text style={[styles.optionText, {color: optionSelected === 2 ? 'red' : 'black'}]}>
                            Lời Chúa
                        </Text>
                    </TouchableOpacity>
                </View>
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
    },
    content: {
        marginTop: 12
    },
    options: {
        marginHorizontal: 16,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    optionText: {
        fontSize: 20,
            
    }
})