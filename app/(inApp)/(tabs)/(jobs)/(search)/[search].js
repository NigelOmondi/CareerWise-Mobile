import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import {
  Stack,
  useRouter,
  useSearchParams,
  useLocalSearchParams,
  Link,
} from "expo-router";
import { Text, SafeAreaView } from "react-native";
import axios from "axios";

// import { ScreenHeaderBtn, NearbyJobCard } from '@/../../components'
import { ScreenHeaderBtn } from "../../../../../components";
import { NearbyJobCard } from "../../../../../components";
import { COLORS, icons, SIZES } from "@/../../constants/index/";
import styles from "../../../../../styles/search";
import { checkImageURL } from "../../../../../utils";

const JobSearch = () => {
  //const params = useSearchParams();
  const param = useLocalSearchParams();
  console.log("Param in search.js", param);
  //console.log("Params in search.js", params)
  const router = useRouter();



  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    //setSearchResult([])

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key": `${process.env.EXPO_PUBLIC_RAPID_API_KEY}`,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: param.search,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
      //console.log("response.data.data Search Result", response.data.data);
    } catch (error) {
      setSearchError("Encountered a search error", error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
    //   handleSearch();
    } else if (direction === "right") {
      setPage(page + 1);
    //   handleSearch();
    }
  };

//   useEffect(() => {
//     handleSearch();
//   }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightWhite} />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

<TouchableOpacity style={{marginTop: 40}} onPress={() => {
    console.log('Navigating to home');
    return <Link href="./(jobs)" asChild/>;
}}>
    <Text>{param.search}</Text>
    <Text>Job Opportunities</Text>
</TouchableOpacity>

      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.container} onPress={()=>{router.push("/(home)")}}>
            <TouchableOpacity style={styles.logoContainer}>
              <Image
                source={{
                  uri: checkImageURL(item.employer_logo)
                    ? item.employer_logo
                    : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                }}
                resizeMode="contain"
                style={styles.logImage}
              />
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.jobName} numberOfLines={1}>
                {item?.job_title}
              </Text>

              <Text style={styles.jobType}>{item?.job_employment_type}</Text>
            </View>

          </TouchableOpacity>
        )}
      />

      {/* <FlatList
        data={searchResult}
        renderItem={({ item }) => (
            <NearbyJobCard
                job={item}
                handleNavigate={() => router.push(`/(jobs)/${item.job_id}`)}
            />
        )}
    
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={[styles.container, { marginTop: 30 }]}>
              <Text style={styles.searchTitle}>{param.search}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
              <TouchableOpacity onPress={()=>router.push("/(home)")}>
                    <Text>Go Home</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={[styles.footerContainer, { marginBottom: 40 }]}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
};

export default JobSearch;
