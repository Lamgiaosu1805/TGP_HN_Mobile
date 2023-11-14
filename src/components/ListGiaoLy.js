import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function ListGiaoLy({option, data}) {
    const [focusItem, setFocusItem] = useState(null);
    return (
        <ScrollView style={{flex: 1}}>
            {
                data.map((e, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.item} 
                        activeOpacity={0.6} 
                        onPressIn={() => {setFocusItem(e)}}
                        onPressOut={() => {setFocusItem(null)}}
                        onPress={() => console.log(e.url)}
                    >
                        <Text style={[focusItem === e ? {color: 'red'} : {}, {fontSize: 16}]}>
                            {e.title}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    }
})