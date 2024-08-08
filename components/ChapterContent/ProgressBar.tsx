import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProgressBar = ({contentLength, contentIndex} : {contentLength: number, contentIndex: number}) => {
    //console.log('Content Length in Progress Bar Component NOW:', contentLength);
    
    //console.log('Content Index in Progress Bar Component:', contentIndex);
    
    
    const arraySize = Array.from({ length: contentLength}, (_, index) => index + 1);
    //console.log("array size in progress bar NOW", arraySize);


    const width = 100 / contentLength;

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, padding:20 }}>
            {arraySize.map((item: any, index: number) => {
            //console.log('Index:', index);
            return (
                <View
                    style={{ 
                        backgroundColor: `${index <= contentIndex ? '#2A6B19' : '#00000030'}`, 
                        height: 10, 
                        width: `${width}%`, 
                        margin: 5,
                        borderRadius: 5,
                        flex: 1,

                     }}
                    key={index}
                >
                </View>
            );
        })}
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({})