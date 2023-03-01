import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'

export default function CalendarDetail({ route }) {

    const loadHtml = async () => {
        let data = [];
        const url = route.params.urlMonth;
        try {
            const response = await fetch(url);
            const htmlString = await response.text();
            const $ = cheerio.load(htmlString);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{route.params.month.toUpperCase()}</Text>
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
        alignItems: 'center',
    },
    titleText: {
        fontSize: 16,
        color: '#1b85a6'
    }
})