import { useUser } from "@clerk/clerk-expo";
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { UserPointsContext } from "@/Context/UserPointsContext";
import { useRouter } from "expo-router";

export default function Header() {

    const router = useRouter()
    
    const userPointsContext = useContext(UserPointsContext);
    
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const getGreeting = () => {
    const currentHour = new Date().getUTCHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning 👋";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon ☀️";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening 🌙";
    } else {
      return "Good Night 😴";
    }
  };

  return (

 
     <LinearGradient colors={['#672BCD', '#341667']} style={styles.container}>
        <StatusBar style='light' />
        <View style={styles.profileMainContainer}>
        
        <TouchableOpacity onPress={()=>{router.push("/profile")}} style={styles.profileContainer}>
            <Image 
                 source={{ uri: user.imageUrl }} 
                style={styles.userImage}
            />
            <View>
                <Text style={{color:'#fff', fontFamily: 'Prompt-Regular'}}>{getGreeting()},</Text>
                <Text style={{color:'#fff', fontSize:14, fontFamily: 'Prompt-Bold'}}>{user.fullName}</Text>
            </View>
           
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{router.push("/leaderBoard")}} style={styles.profileContainer}>
          <Image source={require('../../assets/images/coin.png')} style={{width: 30, height: 30}} />
          <Text style={{fontFamily: 'Prompt-Bold', color: '#FFA500', fontSize: 14}}>{userPointsContext?.points} Points</Text>
        </TouchableOpacity>
        
        </View>
        {/* search bar section */}
        <View style={styles.searchBarContainer}>
            <TextInput 
                placeholder='search courses...'
                style={styles.textInput}
            />
              
            <AntDesign name="search1" size={26} color={'FFA500'} style={styles.searchBtn}/>
        </View>
    </LinearGradient>

 

  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: 'FFA500',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    textInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '85%',
        fontSize: 16,
        fontFamily: 'Prompt-LightItalic'

    },
    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
       
      
    },
    searchBtn: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    }
})