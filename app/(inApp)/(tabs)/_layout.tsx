import { Tabs } from "expo-router";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false,
      tabBarStyle: {
        backgroundColor: "#000",
        position: 'absolute',
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: "#FFA500",
     }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Docs",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(courses)"
        options={{
          title: "Videos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="computer" size={size} color={color} />
          ),
        }}
      />

<Tabs.Screen
        name="(funspace)"
        options={{
          title: "FunSpace",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="theater-comedy" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(leaderboard)"
        options={{
          title: "Ranking",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(jobs)"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase-search-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
