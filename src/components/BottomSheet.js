import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

export default function ModalBottomSheet(props) {
  const onClose = props.onClose;
  const sheetRef = useRef(null);
  const snapPoints = ["95%"];
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => {onClose(false)}}
    >
      <BottomSheetView style={{flex: 1}}>
        <View style={{flex:1, backgroundColor: '#F6F6F6'}}></View>
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({})