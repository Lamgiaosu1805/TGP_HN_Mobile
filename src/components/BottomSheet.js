import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useSelector } from 'react-redux'
import { WebView } from 'react-native-webview'
import * as cheerio from 'cheerio';

export default function ModalBottomSheet(props) {
  const onClose = props.onClose;
  const sheetRef = useRef(null);
  const snapPoints = ["95%"];
  const urlPost = useSelector(state => state.urlPost);
  const [htmlString, setHtmlString] = useState('')
  const loadHtml = async () => {

    const response = await fetch(urlPost);
    const htmlStringg = await response.text();
    const $ = cheerio.load(htmlString);
    const header = $('.hfeed', '.site-header').html();

    setHtmlString(htmlStringg)
    console.log(header);
  }

  useEffect(() => {
    loadHtml();
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => {onClose(false)}}
    >
      <BottomSheetView style={{flex: 1}}>
        <View style={{flex:1, backgroundColor: '#F6F6F6'}}>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlString}}
        />
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({})