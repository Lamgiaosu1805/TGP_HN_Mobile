import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

export default function HomeScreenWebview() {
  return (
    <View style={{flex: 1}}>
        <WebView
            style={styles.webview} 
            source={{ uri: 'https://www.tonggiaophanhanoi.org/' }}
            allowsBackForwardNavigationGestures={true}
            onLoadStart={() => {
                console.log("1");
            }}
            onLoadProgress={() => {
                console.log("2");
            }}
            onLoadEnd={() => {
                console.log("3");
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    webview: {
        flex: 1
    }
})``