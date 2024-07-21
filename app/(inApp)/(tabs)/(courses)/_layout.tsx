import { Stack } from "expo-router";

export default function CoursesLayout() {
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
        <Stack.Screen name="courses" options={{title: 'Courses'}}/>
      </Stack>
    );
  }