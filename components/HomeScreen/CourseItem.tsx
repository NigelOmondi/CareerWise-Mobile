import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import CourseProgressBar from './CourseProgressBar'

const CourseItem = ({item, completedChapters}: any) => {

    //console.log("completed chapters in CourseItem.tsx", completedChapters);
    
  return (
    <View style={{ padding: 10, backgroundColor: '#fff', borderRadius: 5, marginRight: 15, width: 268 }}>
    <Image source={{ uri: item.banner.url }}
        style={{ width: '100%', height: 100, alignItems: 'center', borderRadius: 5 , justifyContent: 'center'}}
    />
    <View style={{ padding: 7 }}>
        <Text style={{ fontFamily: 'Prompt-Regular', fontSize: 17 }}>{item.name}</Text>
    </View>

    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 7 }}>
            <Ionicons name='book-outline' size={24} color='#000' />
            <Text>{item.chapters.length} Chapters</Text>
        </View>
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 7 }}>
                <Ionicons name='timer-outline' size={24} color='#000' />
                <Text>{item.time}</Text>
            </View>
        </View>
    </View>
    <Text style={styles.priceText}>{item.price == 0 ? 'Free' : '$ '+item.price }</Text>

    {completedChapters !== undefined ? 
      <CourseProgressBar totalChapters={item?.chapters.length} completedChapters={completedChapters}
    /> : null}
    
</View>
  )
}

export default CourseItem

const styles = StyleSheet.create({
    priceText: {
        paddingHorizontal: 7,
        fontSize: 15,
        fontFamily: 'Prompt-SemiBold',
        color: '#2467EC'
    }
})