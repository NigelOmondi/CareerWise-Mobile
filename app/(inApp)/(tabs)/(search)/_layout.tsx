import { Stack } from "expo-router";

export default function SearchLayout() {
    return (
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="search" options={{title: 'Search'}}/>
      </Stack>
      
    );
  }