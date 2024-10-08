import { useAuth } from "@clerk/clerk-expo";
import { Text } from "react-native";

export default function UseAuth() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <Text>
      Hello, {userId} your current active session is {sessionId}
    </Text>
  );
}