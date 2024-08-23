import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  ToastAndroid,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity 
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  BannerAd,
  InterstitialAd,
  RewardedAd,
  BannerAdSize,
  TestIds,
  MobileAds,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import mobileAds from "react-native-google-mobile-ads";
import { AdEventType } from "react-native-google-mobile-ads";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { COLORS, icons, images, SIZES } from "@/constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "@/components";
import { Link } from "expo-router";
import * as Linking from 'expo-linking';
import axios from 'axios';


const initializeAds = async () => {
  const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  if (result === RESULTS.DENIED) {
    // The permission has not been requested, so request it.
    await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  }

  try {
    const adapterStatuses = await MobileAds().initialize();
    console.log("New Adapter Statuses", adapterStatuses);
  } catch (error) {
    console.error("Initialization error:", error);
  }
};

// Call the function to initialize ads
initializeAds();

const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  keywords: ["fashion", "clothing"],
});

const JobsHomeScreen = () => {

  const upworkCallbackURL = Linking.createURL('jobsHome')
  const url = Linking.useURL();

  const [fetchedData, setFetchedData] = useState()

  const fetchData = async () => {
    try {
      const response: any = await axios.get("https://upgradecareerwise.com/upwork.html");
      console.log("Fetched data:", response.data)
      setFetchedData(response)
    } catch (error) {
      console.log("Error fetching data", error)

    }
  }

  useEffect(()=> {
    fetchData();
  }, [])

  // console.log("Upwork callback url", upworkCallbackURL)
  // console.log("Use url", url)

  const [loaded, setLoaded] = useState(false);
  const [rewardAdLoaded, setRewardAdLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { signOut, sessionId } = useAuth();

  const { user } = useUser();

  const router = useRouter();

  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
  //     setLoaded(true);
  //   });

  //   // Start loading the interstitial straight away
  //   interstitial.load();

  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);

  // // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardAdLoaded(true);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // No advert ready to show yet
  if (!rewardAdLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      <View>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <LinearGradient
          colors={["#672BCD", "#341667"]}
          style={{ height: 160, padding: 30 }}
        >
          <Text style={styles.profileHeaderText}>Browse Jobs</Text>
        </LinearGradient>
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
          <ScrollView>
            <View style={{ padding: SIZES.medium }}>
              <Welcome
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleClick={() => {
                  if (searchTerm) {
                    // 
                    router.push(`./(search)/${searchTerm}`);
                  }
                }}
              />
              <Popularjobs />
              
              <Nearbyjobs />
            </View>
          </ScrollView>
        </SafeAreaView>
        {/* <Text>Banner Ad</Text>
        

        <View >
        <BannerAd 
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
            networkExtras: {
              collapsible: "bottom",
            },
            
          }}
        />
        </View>
        
        
        <Text>Interstitial Ad</Text>
        <Button
        title="Show Interstitial"
        onPress={() => {
          if (loaded) {
            interstitial.show();
          } else {
            Alert.alert('Interstitial not loaded');
          }
        }}
      />
 <Text>Rewarded Ad</Text>
<Button
      title="Show Rewarded Ad"
      onPress={() => {
        rewarded.show();
      }}
    /> */}

        {/* <View style={{alignSelf: 'center', marginTop: 250}}>
        <Text style={{fontFamily: 'Prompt-Bold', fontSize: 30, textAlign: 'center'}}>Job Listings Coming Soon</Text>
      </View> */}
      </View>
    </LinearGradient>
  );
};

export default JobsHomeScreen;

const styles = StyleSheet.create({
  profileHeaderText: {
    fontFamily: "Prompt-Bold",
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
  },
});
