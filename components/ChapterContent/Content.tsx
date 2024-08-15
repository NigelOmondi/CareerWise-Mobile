import { Dimensions, FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import ProgressBar from './ProgressBar'
import ContentItem from './ContentItem';
import { useNavigation } from '@react-navigation/native';


const Content = ({ content, OnChapterFinish }: any) => {
    //console.log('Content in content screen:', content);

    const [activeIndex, setActiveIndex] = useState(0);

    const navigation: any = useNavigation();

    const contentRef = useRef<FlatList>(null)

    const screenWidth = Dimensions.get('screen').width;

    const OnNextButtonPress = (index: number) => {
        const nextIndex = index + 1;
        if (contentRef.current && nextIndex < content.length) {
            contentRef.current.scrollToIndex({ animated: true, index: nextIndex });
            setActiveIndex(nextIndex);
        } else if (nextIndex === content.length) {
            //navigation.goBack();
            OnChapterFinish()
        
        }
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: {viewableItems: any}) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 50,
    }).current;

    const getItemLayout = (data: any, index: number) => (
        { length:  screenWidth, offset:  screenWidth * index, index }
    );


    return (
        <View>
            <ProgressBar contentLength={content.length} contentIndex={activeIndex} />
    
            <FlatList
                data={content}
                ref={contentRef}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                snapToInterval={screenWidth}
                decelerationRate="fast"
                getItemLayout={getItemLayout}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }: any) => (
                    <View style={{ width: Dimensions.get('screen').width, padding: 20 }}>
                        <ScrollView
                        showsVerticalScrollIndicator={false}
                        >
                            <Text style={{ fontFamily: 'Prompt-Bold', fontSize: 24, marginLeft: 5 }}>
                                {item.heading}
                            </Text>
                            <ContentItem
                                description={item.description.html}
                                output={item?.output?.html}
                            />
                        </ScrollView>
                      
                        <TouchableOpacity onPress={()=>OnNextButtonPress(index)}
                            style={{position: 'absolute', bottom:300, width: '100%', alignSelf: 'center'}}>
                            <Text style={{
                                backgroundColor: '#2467EC',
                                padding: 10, color: '#fff',
                                borderRadius: 5,
                                textAlign: 'center',
                                fontFamily: 'Prompt-SemiBold',
                                letterSpacing: 1,
                                fontSize: 15
                            }}>{index < content.length - 1 ? 'Swipe on Screen or Click Here' : 'Finish'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item: any) => item.id}
            />
        
        </View>
    )
}

export default Content

const styles = StyleSheet.create({})