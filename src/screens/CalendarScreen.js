import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react';
import * as cheerio from 'cheerio';
import { useEffect, useState } from 'react';

export default function CalendarScreen({ navigation }) {
    const [data, setData] = useState([])
    const loadHtml = async () => {
        let data = [];
        const url = 'https://www.tonggiaophanhanoi.org/lich-phung-vu-cong-giao-2022-2023/'
        try {
            const response = await fetch(url);
            const htmlString = await response.text();
            const $ = cheerio.load(htmlString);
            $("h3").each((index, el) => {
                const month = $(el).find('a').text().trim();
                const urlMonth = $(el).find('.has-text-align-center a').attr('href');
                if(index <= 13) {
                    data.push({
                        month, urlMonth
                    });
                }
            });
            setData(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadHtml();
    }, []);

    return (
        <ScrollView style = {styles.container} showsVerticalScrollIndicator={false}>
            <Image style={styles.img} source={{uri: "https://www.tonggiaophanhanoi.org/wp-content/uploads/2022/11/lich-phung-vu-2023-800x610.jpg"}}/>
            <View style = {styles.title}>
                <Text style={styles.titleText}>LỊCH PHỤNG VỤ CÔNG GIÁO 2022 – 2023</Text>
            </View>
            <View style={{marginTop: 24}}>
                {
                    data.length != 0
                        ? data.map((e, index) => {
                            return <TouchableOpacity 
                                key={index} 
                                style={styles.monthItem} 
                                activeOpacity={0.5}
                                onPress = {() => navigation.navigate('CalendarDetail', e)}
                            >
                                <Text style={styles.monthItemText}>{e.month.toUpperCase()}</Text>
                            </TouchableOpacity>
                        })
                        : <View style={{marginHorizontal: 16}}>
                            <ActivityIndicator color="#009688" size="large" />
                        </View>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        alignItems: 'center',
        marginTop: 16
    },
    titleText: {
        fontSize: 16,
        color: '#1b85a6'
    },
    img: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 61 / 80,
        resizeMode: 'cover',
    },
    monthItem: {
        marginLeft: 16,
        marginBottom: 8,
        padding: 8
    },
    monthItemText: {
        fontSize: 16
    }
})