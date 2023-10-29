import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import utils from '../utils'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function LinhMucScreen() {
    const [page, setPage] = useState(1);
    const [listLm, setListLm] = useState([])
    const getListLinhMuc = () => {
        axios.get(`${utils.apiUrl}/linhmucdoan/`)
            .then(res => setListLm(res.data.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getListLinhMuc();
    }, []);

    const LmItem = ({name, image}) => (
        <View style={styles.lmItem}>
            <Image 
                source={{
                    uri: image == ""
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    : image
                }}
                style={styles.img}
                resizeMode='contain'
            />
            <Text style={styles.textItem}>{"Lm. " + name}</Text>
        </View>
    )

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
                />
            </View>
            {
                listLm.length > 0
                ?
                <FlatList 
                    data={listLm}
                    renderItem={({item}) => 
                        <LmItem name={item.name} image={item.image}/>
                    }
                />
                :
                <View style={{flex: 1, justifyContent:'center'}}>
                    <ActivityIndicator />
                </View>
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
        fontWeight: '700',
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