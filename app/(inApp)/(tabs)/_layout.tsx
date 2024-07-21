import { Tabs } from 'expo-router';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


export default function TabLayout() {
    return (
      <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name="(home)"options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="home" size={size} color={color} />
                          )
                    }}/>
        <Tabs.Screen name="(search)" options={{title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          )
        }}/>
        <Tabs.Screen name="(courses)" options={{title: 'Courses', 
            tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="computer" size={size} color={color} />
            )}}/>
        <Tabs.Screen name="(profile)" options={{
                                              title: 'Profile', 
                                              tabBarIcon: ({ color, size }) => (
                                              <AntDesign name="user" size={size} color={color} />
                          )}}/> 
      </Tabs>
    );
  }