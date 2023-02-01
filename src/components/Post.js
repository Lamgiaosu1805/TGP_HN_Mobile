import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';

export default function Post(props) {
    const postData = props.postData;
    const onClickPost = props.onClickPost;
    return (
        <TouchableOpacity 
            style = {styles.container} 
            onPress={() => {onClickPost(true)}}
            activeOpacity={0.7}>
            <View style = {styles.highlightPost}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{uri:postData.imageUrl}} loadingIndicatorSource={require('../../assets/Iphone-spinner-2.gif')}/>
                </View>
                <Text style={styles.titlePost}>{postData.titlePost}</Text>
                <Text style={styles.metaData_Date}>{postData.metaData_Date}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    highlightPost: {
        paddingHorizontal: 20,
        marginTop: 8,
        paddingVertical: 12,
    },
    imgContainer: {
        shadowColor: '#171717',
        shadowOffset: {
            width: 4,
            height: -4
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
    },
    img: {
        width: Dimensions.get('window').width-40,
        height: Dimensions.get('window').width/3*2-40,
        resizeMode: 'cover',
    },
    titlePost: {
        fontSize: 20,
        fontWeight: '700',
        color: '#54595F',
        marginTop: 12
    },
    metaData_Date: {
        color: '#adadad',
        fontSize: 13,
        marginTop: 2,
    }
})