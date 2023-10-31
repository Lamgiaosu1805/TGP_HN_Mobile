import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import utils from '../utils'

export default function GiaoXuScreen({navigation}) {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [listGx, setListGx] = useState([]);
    const getDataGiaoXu = () => {
        setLoading(true)
        axios.get(`${utils.apiUrl}/giaoxu/page/${page}`)
            .then(res => {
                if(res.data.data.length == 0) {
                    setLoading(false);
                    return;
                }
                setListGx([...listGx, ...res.data.data]);
                setLoading(false)
                setPage(page+1)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDataGiaoXu()
    },[]);

    const loadMore = () => {
        if(loading === false) {
            getDataGiaoXu();
        }
    }

    const GxItem = useCallback(({giaoXu}) => {
        return(
            <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.item}
                onPress={() => navigation.navigate('GiaoXuDetailScreen', giaoXu)}
            >
                <Image 
                    source={{
                        uri: giaoXu.image.length == 0 || giaoXu.image == ""
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                        : giaoXu.image[0]
                    }}
                    style={styles.img}
                    resizeMode='contain'
                />
                <View style={styles.content}>
                    <Text style={styles.contentText}>
                        {`Giáo xứ ${giaoXu.name}`}
                    </Text>
                    <Text style={styles.contentText}>
                        {`Linh Mục Quản Xứ / Giám quản: ${giaoXu.LinhMucQx.name}`}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>DANH SÁCH CÁC GIÁO XỨ TGP HÀ NỘI</Text>
            </View>
            {
                listGx.length > 0
                ?
                <FlatList 
                    data={listGx}
                    renderItem={({item}) => 
                        <GxItem giaoXu={item}/>

                    }
                    onEndReached={() => {loadMore()}}
                />
                :
                <View style={{flex: 1, justifyContent:'center'}}>
                    <ActivityIndicator />
                </View>
            }
            {
                loading === true && page > 1
                    ?
                    <View style={{justifyContent:'center', position: 'absolute', bottom: 10, left: 0, right: 0}}>
                        <ActivityIndicator />
                    </View>
                    : <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        justifyContent:'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 8
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
    },
    item: {
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        backgroundColor: 'white',
        elevation: 1,
        borderRadius: 4,
        justifyContent: 'space-between',
        alignItems:'center',
        marginHorizontal: 16,
        paddingVertical: 16,
        marginTop: 4,
        marginBottom: 8
    },
    img: {
        width: 150,
        height: 150,
        marginBottom: 8
    },
    content: {
        alignItems: 'center',
        margin: 16
    },
    contentText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 4
    }
})