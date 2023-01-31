import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as cheerio from 'cheerio';
import Post from './src/components/Post';
import Shimmer from './src/components/Shimmer';

export default function App() {
  const [postData, setPostData] = useState([]);
  let data = [];
  const loadHtml = async () => {
    const searchUrl = `https://www.tonggiaophanhanoi.org/`;
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

      data.push({
        imageUrl, titlePost, metaData_Date
      });
    });
    
    setPostData(data);
  }
  
  useEffect(() => {
    loadHtml();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{paddingHorizontal: 20, paddingVertical: 16}} >
        <Image loadingIndicatorSource={require('./assets/Iphone-spinner-2.gif')} source={{uri: "https://www.tonggiaophanhanoi.org/wp-content/uploads/2020/12/logo_150.png"}} style={{width: 80, height: 85}}/>
      </View>
      {postData.length > 0 
      ? <View style={{flex: 1}}>
          <ScrollView>
            <Post postData={postData[0]}/>
            <Post postData={postData[1]}/>
            <Post postData={postData[2]}/>
            <Post postData={postData[3]}/>
            <Post postData={postData[4]}/>
          </ScrollView>
        </View>
      : <ScrollView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent:'center',
    // alignItems:'center'
  },
});
