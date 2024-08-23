import React from "react";
import { useRouter, Link } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hooks/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
 
  const { data, isLoading, error } = useFetch("search", {
    query: "React Native developer",
    num_pages: "1",
  });

  const handleNavigate = () => {
    router.push({
      pathname: '/(jobs)/[id]',
      query: { id: job.job_id },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => {
            // console.log(`Job ID: ${job.job_id}`);
            return (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job.job_id}`}
                handleNavigate={() => router.push(`/(jobs)/${job.job_id}`)}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
