import { TouchableOpacity, ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import * as cheerio from 'cheerio';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CalendarDetail({ route, navigation }) {
    const [content, setContent] = useState([]);
    const loadHtml = async () => {
        let data = [];
        const url = route.params.urlMonth;
        try {
            const response = await fetch(url);
            const htmlString = await response.text();
            const $ = cheerio.load(htmlString.replace("<h3", "<p"));
            $(`.entry-content p`).each((index, el) => {
                const contentItem = $(el).text().trim() != "" ? $(el).text().trim() : "no";
                const strongContentItem = $(el).find('strong').text().trim() != "" ? $(el).find('strong').text().trim() : "no";
                data.push({
                    contentItem, strongContentItem, index
                });
                setContent(data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadHtml()
    },[]);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity style={{width: 30, height: 30}} onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-back" size={25}/>
                </TouchableOpacity>
                <Text style={styles.titleText}>{route.params.month.toUpperCase()}</Text>
                <View style={{width: 30, height: 30}}></View>
            </View>
            <View style={styles.content}>
                {
                    content.length > 0 
                    ? <FlatList 
                        data={content}
                        keyExtractor = {item => item.index}
                        renderItem={({item}) => 
                            <View style={styles.contentItem}>
                                <Text style={[
                                    styles.contentText,
                                    item.strongContentItem != "no"
                                    ? {
                                        fontWeight: 'bold',
                                        color: '#1b85a6'
                                    } 
                                    : {}
                                ]   
                                }>
                                    {item.contentItem}
                                </Text>
                            </View>
                        }
                    />  
                    : <View>
                        <ActivityIndicator color="#009688" size="large" />
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 20,
        color: '#1b85a6'
    },
    content: {
        padding: 10,
        marginBottom: 20
    },
    contentItem: {
        marginBottom: 16
    },
    contentText: {
        fontSize: 18
    }
})