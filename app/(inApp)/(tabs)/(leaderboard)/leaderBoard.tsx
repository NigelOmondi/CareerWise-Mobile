import { FlatList, Image, StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { createNewUser, getAllUsers, getUserDetail } from '@/Services/cms';
import { UserPointsContext } from '@/Context/UserPointsContext';
import { useUser } from '@clerk/clerk-expo';
import { getUserPoints } from '@/Services/storeUserPoints';




const LeaderBoard = () => {
  const [userList, setUserList] = useState([]);

  const { user } = useUser()

  //console.log("Sined In User ID in leaderboard", user?.id);
  

  const userPointsContext = useContext(UserPointsContext);

  const { points, setPoints } = userPointsContext!;

  const GetAllUsersDetails = () => {
    getAllUsers().then((res: any) => {
      //console.log('LeaderBoard userDetails:', res.userDetails); // returns, id, profileImage, userName, point
     // console.log("LeaderBoard Points from backend", res.userDetails.point)
      setUserList(res.userDetails);
      
    });
  }

  useEffect(() => {
    GetAllUsersDetails();
    //console.log("User Points in leaderboard", points);
    //console.log("userPointsContext?.points in leaderboard", userPointsContext?.points);
    
    
  }, [user]);

  useEffect(() => {
    getUserPoints().then((res) => {
      //console.log("Async Storage Response on leaderboard", res);
      setPoints(res);
     
    });
  }, [points]);

  
  useEffect(() => {
    createUser();
  }, [user]);

  const createUser = async () => {
    if (user) {
      createNewUser(user.fullName, user.emailAddresses[0].emailAddress, points, user.imageUrl).then((res: any) => {
        //console.log('User created successfully on home.tsx', res);
       
        if (res) {
          GetUser();
        }
        
      });
    }
  }

  const GetUser = () => {
    getUserDetail(user?.emailAddresses[0].emailAddress ?? '').then((res: any) => {
      //console.log('User details now only returns {"userDetail": {"point": 10}}:', res);
      //console.log("res on leaderboard.tsx", res);
      
      if (res) {
        //setPoints();
        //console.log('User Points returned from getUserDetail API on leaderboard.tsx"', res.userDetail.point);
        // console.log("Context Points now on leaderboard.tsx", points);
        
        
      }
    });
  }
  
  return (
    <LinearGradient
    colors={['#E5ECF9', '#F6F7F9']}
    style={{flex: 1}}
  >
    <View>
    <StatusBar backgroundColor='transparent' barStyle="light-content" />
    
      <LinearGradient colors={['#672BCD', '#341667']} style={{height: 160, padding: 15}}>

       <Text style={styles.leaderBoardText}>The Leader Board</Text>
       
       <Image source={require('@/assets/images/trophy-star.png')} 
          style={{width: 50, height: 50, alignSelf: 'center', marginTop: 2}} 
        />

      </LinearGradient>

      <View style={{height: '85%'}}>
        <FlatList
          data={userList}
          keyExtractor={(item: any, index) => index.toString()}
          renderItem={({item, index}) => {
            //console.log("Item", item);
            
            return (
            <View style={{flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: 10,
              backgroundColor: user?.fullName === item.userName ? '#91EA7A' : '#fff',
              margin: 8,
              marginHorizontal: 15,
              borderRadius: 5,
              elevation: 2}}>
              <View style={{padding: 10, flexDirection: 'row', gap: 12, alignItems: 'center'}}>
                <Text style={{fontFamily: 'Prompt-Bold', fontSize: 18,color: '#A1A1A1',}}>{index+1}</Text>
                <Image source={{uri: item.profileImage}} style={{width: 50, height: 50, borderRadius: 50}} />
                <View>
                  <Text style={{fontFamily: 'Prompt-SemiBold', fontSize: 18}}>{item.userName}</Text>
                  <Text style={{color: '#672BCD', fontSize: 16, fontFamily: 'Prompt-SemiBold'}}>{item.point} Points</Text>
                </View>
              </View>
              {index === 0 && <Image source={require('@/assets/images/gold-medalist.png')} style={{width: 50, height: 50, alignSelf: 'center'}} />}
              {index === 1 && <Image source={require('@/assets/images/silver-medalist.png')} style={{width: 50, height: 50, alignSelf: 'center'}} />}
              {index === 2 && <Image source={require('@/assets/images/bronze-medalist.png')} style={{width: 50, height: 50, alignSelf: 'center'}} />}
              {index > 2 && <Image source={require('@/assets/images/ordinary-medal.png')} style={{width: 43, height: 43, alignSelf: 'center'}} />}
            </View>
  )}} 
        />
      </View>
     
    </View>
    </LinearGradient>
  )
}

export default LeaderBoard

const styles = StyleSheet.create({
  leaderBoardText: {
    fontFamily: 'Prompt-Bold',
    fontSize: 24, 
    color: '#fff', 
    textAlign: 'center',
    marginTop: 40
  }
})