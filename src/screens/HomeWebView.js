import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import Shimmer from '../components/Shimmer';

const ActivityIndicatorElement = () => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
};

const MainLoading = () => {
    return (
        <View style = {styles.container}>
            <View style={{
                paddingHorizontal: 20, 
                paddingVertical: 16, 
                flexDirection: 'row',
            }}>
                <Image source={{uri: "https://www.tonggiaophanhanoi.org/wp-content/uploads/2020/12/logo_150.png"}} style={{width: 80, height: 85}}/>
                <View style={styles.textLogo}>
                    <Text style={styles.textLogo_1}>Tổng Giáo Phận Hà Nội</Text>
                    <Text style={styles.textLogo_2}>Archdiocese of Ha Noi</Text>
                </View>
            </View>
            <ScrollView style={{marginTop: 16}}>
                <View style = {{alignItems: 'center'}}>
                    <Shimmer
                    width={Dimensions.get('window').width-40}
                    height={Dimensions.get('window').width/3*2-40}
                    />
                </View>
                <View style={{paddingLeft: 20 , marginTop: 8}} >
                    <Shimmer width={Dimensions.get('window').width*2/3} height={20}/>
                </View>
                <View style={{paddingLeft: 20 , marginTop: 8, marginBottom: 12}} >
                    <Shimmer width={Dimensions.get('window').width/2} height={20}/>
                </View>
                <View style = {{alignItems: 'center'}}>
                    <Shimmer 
                    width={Dimensions.get('window').width-40}
                    height={Dimensions.get('window').width/3*2-40}
                    />
                </View>
                <View style={{paddingLeft: 20 , marginTop: 8}} >
                    <Shimmer width={Dimensions.get('window').width*2/3} height={20}/>
                </View>
                <View style={{paddingLeft: 20 , marginTop: 8, marginBottom: 12}} >
                    <Shimmer width={Dimensions.get('window').width/2} height={20}/>
                </View>
                <View style = {{alignItems: 'center'}}>
                    <Shimmer 
                    width={Dimensions.get('window').width-40}
                    height={Dimensions.get('window').width/3*2-40}
                    />
                </View>
                <View style={{paddingLeft: 20 , marginTop: 8}} >
                    <Shimmer width={Dimensions.get('window').width*2/3} height={20}/>
                </View>
                <View style={{paddingLeft: 20 , marginTop: 8, marginBottom: 12}} >
                    <Shimmer width={Dimensions.get('window').width/2} height={20}/>
                </View>
            </ScrollView>
        </View>
    );
}

export default function HomeWebView() {
    const [loading, setLoading] = useState(false);
    const [webviewKey, setWebviewKey] = useState(0);
    const reload = () => {
        setWebviewKey(webviewKey + 1);
    }
    return (
        <View style={{flex: 1}}>
            <WebView 
                source={{ uri: "https://www.tonggiaophanhanoi.org/" }}
                allowsBackForwardNavigationGestures = {true}
                domStorageEnabled = {true}
                onLoadStart={() => {
                    setLoading(true)
                }}
                onLoad={() => {
                    setLoading(false)
                }}
                renderLoading={MainLoading}
                startInLoadingState={true}
                onResponderTerminate={reload}
                onResponderTerminationRequest={reload}
                onContentProcessDidTerminate={reload}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                }}
                bounces={true}
                pullToRefreshEnabled={true}
                decelerationRate={0.998}
            />
            {loading ? <ActivityIndicatorElement /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff', 
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    webView: {
        flex: 1
    },
    activityIndicatorStyle: {
        height: 40,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center'
    },
    textLogo: {
        marginLeft: 12,
        flex: 1,
        justifyContent:'center',
    },
    textLogo_1: {
        color: '#f70303',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 2,
        // fontFamily: "Times New Roman"
    },
    textLogo_2: {
        color: '#ea8203',
        fontSize: 18
    }
})