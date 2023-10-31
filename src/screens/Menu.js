import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LogoTitle from '../components/logo';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Menu({navigation}) {
  return (
    <View style={styles.container}>
        <LogoTitle />
        <View style={styles.menuArea}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.menuAreaText}>Thông tin</Text>
                <Icon name='info-circle' color={"#4f4747"}/>
            </View>
            <View style={styles.menuAreaItem}>
                <MenuItem title= "Các Giáo hạt"/>
                <MenuItem title= "Các Giáo xứ" navigation={navigation} screenName="GiaoXuScreen"/>
                <MenuItem title= "Linh mục đoàn" navigation={navigation} screenName="LinhMucScreen"/>
            </View>
        </View>
        <View style={styles.menuArea}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.menuAreaText}>Cài đặt</Text>
                <Icon name='cog' color={"#4f4747"}/>
            </View>
            <View style={styles.menuAreaItem}>
                <MenuItem title= "Chủ đề"/>
                {/* <MenuItem title= "Các Giáo xứ"/>
                <MenuItem title= "Linh mục đoàn"/> */}
            </View>
        </View>
    </View>
  )
}

const MenuItem = (props) => {
    const title = props.title
    return (
        <TouchableOpacity 
            style={styles.menuItem} 
            activeOpacity={0.5}
            onPress={() => navigation(props.navigation, props.screenName)}
        >
            <Text style={styles.menuItemText}>{title}</Text>
            <Icon name="angle-right" size={20}/>
        </TouchableOpacity>
    );
}

const navigation = (navigation, screenName) => {
    try {
        navigation.navigate(screenName);
    } catch (error) {
        console.log(error)
        Alert.alert(title="Thông báo", message="Tính năng chưa khả dụng")
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    menuArea: {
        marginTop: 16,
        paddingHorizontal: 16,
        marginBottom: 16
    },
    menuAreaText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4f4747',
        marginRight: 4
    },
    menuAreaItem: {
        marginTop: 8
    },
    menuItem: {
        height: 50,
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
        paddingHorizontal: 16,
        marginTop: 4,
        flexDirection: 'row',
    },
    menuItemText: {
        fontSize: 18,
        fontWeight: '500'
    }
})