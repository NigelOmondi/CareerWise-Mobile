import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RenderHtml from 'react-native-render-html';

const ContentItem = ({ description, output }: { description: string, output: string }) => {

  const [isRun, setIsRun] = useState(false)

  const { width } = useWindowDimensions();

  const descriptionSource = {
    html: description
  }

  const outputSource = {
    html: output
  }

  const source = {
    html: `
  <p style='text-align:center;'>
    Hello World!
  </p>`
  };


  return (
    <View style={{marginBottom: 250}}>
      {/* <Text>{description}</Text> */}
      <RenderHtml
        contentWidth={width}
        source={descriptionSource}
        tagsStyles={tagsStyles}
      />
      {output != "<p></p>" ?
        <TouchableOpacity style={{marginTop: -20}} onPress={()=>setIsRun(true)}>
          <Text style={{
            backgroundColor: '#2A6B19',
            padding: 10, borderRadius: 5, color: '#fff',
            fontFamily: 'Prompt-SemiBold', fontSize: 16,
            letterSpacing: 1,
            width: 100,
            textAlign: 'center'
          }}>Run</Text>
        </TouchableOpacity> : null
      }
      
      {isRun ? 
      <>
        <Text style={{marginTop: 20, marginLeft: 5, fontFamily: 'Prompt-MediumItalic'}}>Output:</Text>
        <RenderHtml
          contentWidth={width}
          source={outputSource}
          tagsStyles={tagsStyles}
        /> 
      </> : null}
        
        
      


    </View>
  )
}

export default ContentItem

const tagsStyles = {
  body: {
    fontFamily: 'Prompt-Regular',
    fontSize: 17
  },
  code: {
    backgroundColor: '#040817',
    color: '#fff',
    padding: 20,
    fontSize: 13,
    borderRadius: 5

  }
}


const styles = StyleSheet.create({
})