import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import utils from '../utils'
import YoutubePlayer from "react-native-youtube-iframe";

export default function GiaoLyDetai({route}) {
    const {url} = route.params;
    const [data, setData] = useState(null)
    
    useEffect(() => {
        axios.post(`${utils.apiUrl}/tinmungthanhmattheu/detail`, {
            url: url
        })
            .then(res => {
                setData(res.data)
            })
            .catch(e => console.log(e))
    }, [])
    return (
        <View style={styles.container}>
            {
                data
                ?   
                    <ScrollView style={{flex:1}}>
                        {
                            data.link
                                ?
                                <YoutubePlayer
                                    height={250}
                                    videoId={data.link.split("/")[url.split("/").length - 1].split("?")[0]}
                                />
                                :
                                <></>
                        }
                        <View style={{marginTop: 8}}>
                            {
                                data.content.map((e, index) => (
                                    <View key={index} style={styles.item}>
                                        <Text 
                                            style={
                                                [
                                                    styles.itemText,
                                                    {
                                                        color: index == 0 || index == 1 ? 'red' : 'black',
                                                        fontWeight: index == 0 || index == 1 ? '600' : '400',
                                                        fontSize:  index == 0 || index == 1 ? 20 : 16,
                                                        textAlign: index == 0 || index == 1 ? 'center' : 'left',
                                                        marginTop: index == 0 || index == 1 ? 0 : 8,
                                                    }
                                                ]
                                            }
                                        >
                                            {e}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                :
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <ActivityIndicator />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    item: {
        paddingHorizontal: 16,
    },
    itemText: {
        fontSize: 16
    }
})