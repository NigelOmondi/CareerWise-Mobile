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
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        
    },
    dotStyle: {
        backgroundColor: '#FFA500',
        width: responsiveWidth(2),
        height: responsiveHeight(2),
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDotStyle: {
        backgroundColor: '#2467EC',
        width: 13,
        height: 13,
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
        color: '#ffffff',
        fontFamily: 'Prompt-Bold',
       
        
    },
    centeredTitle: {
        fontSize: hp("3.5%"),
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'Prompt-Bold',
        
    },
    description: {
        fontSize: hp("2%"),
        color: '#ffffff',
        marginHorizontal: 34,
        fontFamily: 'Prompt-Light',
        
    },
    centeredDescription: {
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
        height: 45,
        borderRadius: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    signInImage: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 70,
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
        marginHorizontal: 10,
        marginTop: 20,
        rowGap: 30,
    },
    input: {
        backgroundColor: '#ffffff',
        height: 50,
        marginHorizontal: 10,
        borderRadius: 5,
        paddingLeft: 44,
        fontSize: 16,
        color: '#000000',
        elevation: 5,
    },
    nameInput: {
        backgroundColor: '#ffffff',
        height: 50,
        paddingLeft: 10,
        marginBottom: 15,
        borderRadius: 5,
        fontSize: 16,
        color: '#000000',
        width: '50%',
        elevation: 5,
    },
    usernameIconStyles: {
        position: 'absolute', 
        left: 26, 
        top: 15,
    },
    signUpEmailIconStyles: {
        position: 'absolute', 
        left: 24, 
        top: 80,
    },
    signInEmailIconStyles: {
        position: 'absolute', 
        left: 24, 
        top: 15,
    },
    passwordEyeIcon: {
        position: 'absolute',
        right: 30,
        top: 15,
    },
    signInPasswordLockStyles: {
        position: 'absolute',
        left: 24,
        top: 13,
        
    },
    signUpPasswordLockStyles: {
        position: 'absolute',
        left: 24,
        top: 12,
        
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
        marginHorizontal: 20,
        position: 'absolute',
        top: 49,
       
    },
    signInPasswordErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        position: 'absolute',
        top: 120,
    },
    signUpPasswordErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'absolute',
        top: 113,
    },
    signUpFirstNameErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        position: 'absolute',
        top: -20,
    },
    signUpLastNameErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 165,
        position: 'absolute',
        top: -20,
    },
    errorText: {
        color: 'red',
        marginLeft: 5,
        fontSize: 11,
        left: 5,
    },
    firstNameErrorText: {
        color: 'red',
        marginLeft: 0,
        fontSize: 11,
        left: 5,
    },
    lastNameErrorText: {
        color: 'red',
        marginLeft: 0,
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
        width: '95%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
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