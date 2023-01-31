import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Post(props) {
    const postData = props.postData;

    return (
        <View style = {styles.highlightPost}>
            <Image style={styles.img} source={{uri:postData.imageUrl}}/>
            <Text>{postData.titlePost}</Text>
            <Text>{postData.metaData_Date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    highlightPost: {
        paddingHorizontal: 20
    },
    img: {
        width: Dimensions.get('window').width-40,
        height: Dimensions.get('window').width/3*2-40,
        resizeMode: 'cover',
    }
})