import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import * as cheerio from 'cheerio';
import LogoTitle from '../components/logo';
import PagerView from 'react-native-pager-view';
import ListGiaoLy from '../components/ListGiaoLy';
import axios from 'axios';
import utils from '../utils';

export default function HocGiaoLy() {
    const [optionSelected, setOptionSelected] = useState(0);
    const [list1, setList1] = useState([])
    const [list2, setList2] = useState([])
    const selectOption = (option) => {
        setOptionSelected(option)
        ref.current?.setPage(option)
    }
    useEffect(() => {
        if(list1.length != 0 && list2.length != 0) return;
        axios.get(`${utils.apiUrl}/tinmungthanhmattheu/${optionSelected == 0 ? "baihoc" : "loichua"}`)
            .then((res) => {
                if(optionSelected == 0) {
                    setList1(res.data.data)
                }
                else {
                    setList2(res.data.data)
                }
            })
            .catch(e => console.log(e))
    }, [optionSelected])
    const ref = useRef()
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
                    <TouchableOpacity onPress={() => selectOption(0)} activeOpacity={1}>
                        <Text style={[styles.optionText, {color: optionSelected === 0 ? 'red' : 'black'}]}>
                            Bài Học
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectOption(1)} activeOpacity={1}>
                        <Text style={[styles.optionText, {color: optionSelected === 1 ? 'red' : 'black'}]}>
                            Lời Chúa
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, marginTop: 8}}>
                    <PagerView 
                        style={{flex: 1}} 
                        initialPage={0} ref={ref} 
                        onPageSelected={(e) => setOptionSelected(e.nativeEvent.position)}
                    >
                        <View key="1">
                            <ListGiaoLy option={0} data={list1}/>
                        </View>
                        <View key="2">
                            <ListGiaoLy option={1} data={list2}/>
                        </View>
                    </PagerView>
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
        marginTop: 12,
        flex: 1
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