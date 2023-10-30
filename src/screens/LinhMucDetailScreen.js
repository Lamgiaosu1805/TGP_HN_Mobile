import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function LinhMucDetailScreen({route, navigation}) {
    const linhMuc = route.params
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Image 
                    source={{
                        uri: linhMuc.image == ""
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                        : linhMuc.image
                    }}
                    style={styles.img}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.info}>
                    {
                        linhMuc.detail.map((item, index) => 
                            <Text key={index} style={styles.item}>
                                {item}
                            </Text>
                        )
                    }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    img: {
        width: 200,
        height: 200,
        marginTop: 16,
    },
    info: {
        marginTop: 24,
        marginHorizontal: 16
    },
    item: {
        marginBottom: 8,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "500"
    }
})