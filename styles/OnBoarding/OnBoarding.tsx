import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const OnBoardingStyles = StyleSheet.create({
    firstContainer: {
        alignItems: "center",
        marginTop: 50,
    },
    logo: {
        width: wp("23%"),
        height: hp("10%"),
    },
    dot: {
        width: 10,
        height: 10,
    },
    titleWrapper: {
        flexDirection: "row",
    },
    titleTextShape1: {
        position: "absolute",
        left: -28,
        top: -30,
        width: 30,
        height: 30,
    },
    titleTextShape2: {
        position: "absolute",
        right: -1,
        bottom: -20,
        top: 50,
        width: 30,
        height: 30,
       
    },
    titleTextShape3: {
        position: "absolute",
        left: 60,
        width: 30,
        height: 30,
    },
    titleText: {
       fontSize: hp("4%"),
       textAlign: "center",
       fontFamily: "Prompt-SemiBold",
    },
    dscpWrapper: {
        marginTop: 30,
    },
    dscpText: {
        fontSize: hp("2%"),
        textAlign: "center",
        fontFamily: "Prompt-Regular",
    },
    dscpText2: {
      fontSize: hp("3%"),
      textAlign: "center",
      fontFamily: "Prompt-Bold",
  },
    buttonWrapper: {
        width: wp("92%"),
        height: hp("7%"),
        backgroundColor: "#FF6347",
        marginTop: 40,
        borderRadius: 4,
    },
    myButtonText: {
        color: "#fff",
        fontSize: hp("3%"),
        textAlign: "center",
        marginTop: 10,
        fontFamily: "Prompt-SemiBold",
    },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: wp("5%"),
  },
  image: {
    width: wp("80%"),
    height: hp("50%"),
    resizeMode: "contain",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginTop: hp("2%"),
  },
  subTitle: {
    fontSize: wp("4%"),
    textAlign: "center",
    color: "#333",
    marginTop: hp("2%"),
  },
  button: {
    width: "100%",
    height: hp("7%"),
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: hp("5%"),
  },
  buttonText: {
    fontSize: wp("4%"),
    color: "#fff",
    fontWeight: "bold",
  },
});