import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import * as cheerio from 'cheerio';

export default function HocGiaoLy() {

    const loadHtml = async () => {
        let data = [];
        const url = "https://www.tonggiaophanhanoi.org/category/giao-ly/tin-mung-mat-theu/";
        try {
            const response = await fetch(url);
            const htmlString = await response.text();
            const $ = cheerio.load(htmlString);
            $('.post-content').each((index, el) => {
                const title = $(el).find('.entry-header').find('h2').text().trim();
                console.log(title);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadHtml()
    },[]);
    return (
        <View>
        <Text>HocGiaoLy</Text>
        </View>
    )
}

const styles = StyleSheet.create({})