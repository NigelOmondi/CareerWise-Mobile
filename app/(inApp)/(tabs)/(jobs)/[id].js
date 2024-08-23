import { Stack, useRouter, useSearchParams, useLocalSearchParams} from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StatusBar
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "@/../../components";
import { COLORS, icons, SIZES } from "@/../../constants";
import useFetch from "@/../../hooks/useFetch";
import { useNavigation, useRoute } from '@react-navigation/native'

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  //const params = useSearchParams();

  const params = useRoute().params;
 
  const { id } = useLocalSearchParams();
  //console.log("Local Search Params ID",id);
  const router = useRouter();

  // const { id } = router.query;
  // console.log("Path ID",id);

 // console.log("Params",params);

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: id,
  });

  //console.log("Data in id.js",data);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);


  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title='Qualifications'
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title='Responsibilities'
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
      <StatusBar barStyle='dark-content' backgroundColor={COLORS.lightWhite} />
      
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={data[0]?.job_apply_link ?? 'https://careers.google.com/jobs/results/'} />
        {/*` https://www.google.com/search?gl=us&hl=en&rciv=jb&q={data[0]?.job_title}&start=0&udm=8&jbr=sep:0#vhid=vt%3D20/docid%3DVMMch4-CGfIwQuLIAAAAAA%3D%3D&vssid=jobs-detail-viewer` */}
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
