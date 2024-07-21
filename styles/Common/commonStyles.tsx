import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const commonStyles = StyleSheet.create({
    basicContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    buttonContainer: {
        backgroundColor: '#FFA500',
        width: '100%',
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        
    },
    dotStyle: {
        backgroundColor: '#FFA500',
        width: responsiveWidth(2.5),
        height: responsiveHeight(2.5),
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDotStyle: {
        backgroundColor: '#2467EC',
        width: 15,
        height: 15,
        borderRadius: 99,
        marginHorizontal: 5,
    },
    slideImage: {
        marginTop: 100,
        height: 250,
        width: 250,
        marginBottom: 30,
    },
    title: {
        fontSize: hp("3.5%"),
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'Prompt-Bold',
        
    },
    description: {
        fontSize: hp("2.5%"),
        textAlign: 'center',
        color: '#ffffff',
        marginHorizontal: 20,
        fontFamily: 'Prompt-Light',
    },
    doneButtonText: {
        fontSize: wp("4%"),
        color: '#2467EC',
      },
      doneButtonContainer: {
        backgroundColor: '#2467EC',
        width: '100%',
        height: 30,
        borderRadius: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    signInImage: {
        width: '60%',
        height: 220,
        alignSelf: 'center',
        marginTop: 50,
    },
    welcomeText: {
        fontSize: hp("3.5%"),
        textAlign: 'center',
        fontFamily: 'Prompt-Bold',
    },
    loginText: {
        fontSize: hp("2.5%"),
        textAlign: 'center',
        fontFamily: 'Prompt-Light',
    },
    inputContainer: {
        marginHorizontal: 16,
        marginTop: 20,
        rowGap: 30,
    },
    input: {
        backgroundColor: '#ffffff',
        height: 55,
        marginHorizontal: 16,
        borderRadius: 8,
        paddingLeft: 40,
        fontSize: 16,
        color: '#000000',
    },
    usernameIconStyles: {
        position: 'absolute', 
        left: 26, 
        top: 15,
    },
    signUpEmailIconStyles: {
        position: 'absolute', 
        left: 26, 
        top: 87,
    },
    signInEmailIconStyles: {
        position: 'absolute', 
        left: 26, 
        top: 17.8,
    },
    passwordEyeIcon: {
        position: 'absolute',
        right: 30,
        top: 18,
    },
    passwordLockStyles: {
        position: 'absolute',
        left: 26,
        top: 17.8,
        marginTop: -2,
    },
    signInEmailErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        position: 'absolute',
        top: -20,
       
    },
    signUpEmailErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        position: 'absolute',
        top: 52,
       
    },
    signInPasswordErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        position: 'absolute',
        top: 130,
    },
    signUpPasswordErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        position: 'absolute',
        top: 122,
    },
    signUpUsernameErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        position: 'absolute',
        top: -20,
    },
    errorText: {
        color: 'red',
        marginLeft: 5,
        fontSize: 11,
        left: 5,
    },
    forgotPasswordSection: {
        marginHorizontal: 16,
        textAlign: 'right',
        fontSize: 16,
        marginTop: -7,
    },
    signInButtonContainer: {
        backgroundColor: '#FFA500',
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInTextStyle: {
        color: '#fff', 
        fontFamily: 'Prompt-Bold', 
        fontSize: 20
    },
    signUpRedirect: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginBottom: 5,
    },

});