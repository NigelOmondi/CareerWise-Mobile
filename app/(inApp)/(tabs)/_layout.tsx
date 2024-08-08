import { Tabs } from 'expo-router';
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Entypo, Ionicons, Feather } from '@expo/vector-icons';
import React from 'react';


export default function TabLayout() {
    return (
      <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name="(home)"options={{
                        title: 'Docs',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="document-text" size={size} color={color} />
                          )
                    }}/>
      
        <Tabs.Screen name="(courses)" options={{title: 'Videos', 
            tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="computer" size={size} color={color} />
            )}}/>

        <Tabs.Screen name="(leaderboard)" options={{title: 'Ranking',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" size={size} color={color} />
          )
        }}/>

        <Tabs.Screen name="(profile)" options={{
                                              title: 'Profile', 
                                              tabBarIcon: ({ color, size }) => (
                                              <Feather name="user" size={size} color={color} />
                          )}}/> 
      </Tabs>
    );
  }