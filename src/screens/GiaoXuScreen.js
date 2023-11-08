import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import utils from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function GiaoXuScreen({navigation}) {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [listGx, setListGx] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [searchStatus, setSearchStatus] = useState(false);

    const getDataGiaoXu = (pageGx, reset) => {
        setLoading(true)
        axios.get(`${utils.apiUrl}/giaoxu/page/${pageGx}`)
            .then(res => {
                if(res.data.data.length == 0) {
                    setLoading(false);
                    return;
                }
                if(reset == true) {
                    setListGx(res.data.data)
                    setPage(2)
                }
                else {
                    setListGx([...listGx, ...res.data.data]);
                    setPage(page+1)
                }
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    useEffect(() => {
        getDataGiaoXu(1)
    },[]);

    const loadMore = () => {
        if(loading === false && searchStatus == false) {
            getDataGiaoXu(page);
        }
    }

    const searchGx = (value) => {
        if(value == "") {
            getDataGiaoXu(1, true)
            setSearchStatus(false)
        }
        else {
            axios.post(`${utils.apiUrl}/giaoxu/search`, {
                "searchValue": value
            }).then(res => {
                setListGx(res.data.data)
                if(searchStatus) return
                setSearchStatus(true)
            })
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
            <View style={styles.inputArea}>
                <Icon name='search' size={16} color="#6a6d73" style={{marginLeft: 8}}/>
                <TextInput
                    enterKeyHint='search'
                    style={styles.searchInput}
                    placeholder='Tìm kiếm ở đây...'
                    onChangeText={(value) => setSearchString(value.trim())}
                    onSubmitEditing={() => {
                        searchGx(searchString)
                    }}
                />
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
    },
    inputArea: {
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#6a6d73',
        marginBottom: 16,
        marginTop: 8
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        color:'#6a6d73',
        marginVertical: 8,
        marginLeft: 4
    },
})