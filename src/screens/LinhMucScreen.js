import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import utils from '../utils'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function LinhMucScreen({navigation}) {
    const [page, setPage] = useState(1);
    const [listLm, setListLm] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [searchStatus, setSearchStatus] = useState(false)

    const getListLinhMuc = (pageLm, reset) => {
        setLoading(true)
        if(typeof pageLm != 'number') return;
        axios.get(`${utils.apiUrl}/linhmucdoan/page/${pageLm}`)
            .then(res => {
                if(res.data.data.length == 0) {
                    setLoading(false);
                    return;
                }
                if(reset == true) {
                    setListLm(res.data.data)
                    setPage(2)
                }
                else {
                    setListLm([...listLm, ...res.data.data]);
                    setPage(page+1)
                }
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        getListLinhMuc(1);
    }, []);

    const loadMore = () => {
        if(loading === false && searchString == "") {
            getListLinhMuc(page);
        }
    }

    const searchLm = (value) => {
        searchStatus(true)
        if(value == "") {
            getListLinhMuc(1, true);
            setSearchStatus(false);
        }
        else {
            axios.post(`${utils.apiUrl}/linhmucdoan/search`, {
                "searchValue": value
            }).then(res => {
                setListLm(res.data);
                setSearchStatus(false);
            })
        }
        
    }

    const LmItem = useCallback(({linhMuc}) => (
        <TouchableOpacity 
            activeOpacity={0.6} 
            style={styles.lmItem}
            onPress={() => navigation.navigate('LinhMucDetailScreen', linhMuc)}
        >
            <Image 
                source={{
                    uri: linhMuc.image == ""
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    : linhMuc.image
                }}
                style={styles.img}
                resizeMode='contain'
            />
            <Text style={styles.textItem}>{"Lm. " + linhMuc.name}</Text>
        </TouchableOpacity>
    ), []);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{"Danh sách Linh mục đoàn TGP Hà Nội".toUpperCase()}</Text>
            </View>
            <View style={styles.inputArea}>
                <Icon name='search' size={16} color="#6a6d73" style={{marginLeft: 8}}/>
                <TextInput
                    enterKeyHint='search'
                    style={styles.searchInput}
                    placeholder='Tìm kiếm ở đây...'
                    onChangeText={(value) => setSearchString(value.trim())}
                    onSubmitEditing={() => {
                        searchLm(searchString)
                    }}
                />
            </View>
            {
                listLm.length > 0 && searchStatus == false
                ?
                <FlatList 
                    data={listLm}
                    renderItem={({item}) => 
                        <LmItem linhMuc={item}/>
                    }
                    onEndReached={loadMore}
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
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    title: {
        justifyContent:'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 8
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
    titleText: {
        fontSize: 20,
        fontWeight: '600',
    },
    lmItem: {
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
        width: 100,
        height: 100,
        marginBottom: 8
    },
    textItem: {
        fontSize: 16,
        fontWeight: '500'
    }
})