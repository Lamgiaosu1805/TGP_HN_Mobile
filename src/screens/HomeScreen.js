import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Post from '../components/Post';
import HeaderTitle from '../components/HeaderTitle';
import Shimmer from '../components/Shimmer';
import * as cheerio from 'cheerio';

export default function HomeScreen() {
    const [postData, setPostData] = useState([]);
    const loadHtml = async () => {
    let data = [];
    const searchUrl = `https://www.tonggiaophanhanoi.org/`;
    try {
      const response = await fetch(searchUrl);// fetch page
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      $(".elementor-post").each((index, el) => {
        
        //get post image
        let imageUrl = $(el).find('.elementor-post__thumbnail__link').find('.elementor-post__thumbnail').text().match('src="[^\"]{1,}"');
        if(imageUrl != null) {
          // imageUrl = imageUrl.toString().match('https://[^\"]{1,}').toString().replace(/\-[1-9]{1}[0-9]{1,}x[1-9]{1}[0-9]{1,}/, "");
          imageUrl = imageUrl.toString().match('https://[^\"]{1,}').toString();
        }

        //get post title
        let titlePost = $(el).find('.elementor-post__text').find('.elementor-post__title').text().trim();

        // get meta data Date post
        let metaData_Date = $(el).find('.elementor-post__text').find('.elementor-post__meta-data .elementor-post-date').text().trim();

        //get link detail post
        let href = $(el).find('.elementor-post__thumbnail__link').attr('href');

        data.push({
          imageUrl, titlePost, metaData_Date, href
        });
      });
      setPostData(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    loadHtml();
  }, []);

  return (
    <View style={styles.container}>
        <View style={{paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row'}} >
            <Image loadingIndicatorSource={require('../../assets/Iphone-spinner-2.gif')} source={{uri: "https://www.tonggiaophanhanoi.org/wp-content/uploads/2020/12/logo_150.png"}} style={{width: 80*2/3, height: 85*2/3}}/>
            <View style={styles.textLogo}>
                <Text style={styles.textLogo_1}>Tổng Giáo Phận Hà Nội</Text>
                <Text style={styles.textLogo_2}>Archdiocese of Ha Noi</Text>
            </View>
        </View>
        
        {postData.length > 0 
        ? <View style={{flex: 1}}>
            <ScrollView>
                <HeaderTitle headerTitle={"Bài nổi bật"}/>
                <Post postData={postData[0]}/>
                <Post postData={postData[1]}/>
                <Post postData={postData[2]}/>
                <Post postData={postData[3]}/>
                <Post postData={postData[4]}/>
            </ScrollView>
        </View>
        : <ScrollView style={{marginTop: 16}}>
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
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textLogo: {
        flex: 1,
        justifyContent:'center',
        marginLeft: 12
    },
    textLogo_1: {
        color: '#f70303',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 2,
        fontFamily: "Times New Roman"
    },
    textLogo_2: {
        color: '#ea8203',
        fontSize: 18
    }
})