import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserPoints = async (value: number) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('userPoints', jsonValue);
    } catch (e) {
      console.log('Error in setting user points:', e);
    }
}

export const getUserPoints = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userPoints');
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
  } catch (e) {
    console.log('Error in getting user points:', e);
  }
}