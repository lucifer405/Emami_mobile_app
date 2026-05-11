import { Alert, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import Typo from '@/components/Typo';
import { useAuth } from '@/contexts/authContext';
import { Image } from 'expo-image';
import { getProfileImage } from '@/services/imageService';
import { accountOptionType } from '@/types';
import * as Icons from 'phosphor-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'expo-router';

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: (
        <Icons.User
          size={26}
          weight="fill"
          color={colors.white}
        />
      ),
      routeName: '/(modals)/profileModal',
      bgColor: "#6366f1"
    },
    {
      title: "Settings",
      icon: (
        <Icons.GearSixIcon
          size={26}
          weight="fill"
          color={colors.white}
        />
      ),
      //routeName: '/(modals)/profileModal',
      bgColor: "#0a9b05"
    },
    {
      title: "Privacy Policy",
      icon: (
        <Icons.Lock
          size={26}
          weight="fill"
          color={colors.white}
        />
      ),
      //routeName: '/(modals)/profileModal',
      bgColor: "#e87b16"
    },
        {
      title: "Logout",
      icon: (
        <Icons.PowerIcon
          size={26}
          weight="fill"
          color={colors.white}
        />
      ),
      //routeName: '/(modals)/profileModal',
      bgColor: "#ef1e1e"
    }
  ]

  const handleLogout = async ()=>{
    await signOut(auth);
  }

  const showLogoutAlert = ()=>{
    Alert.alert("Confirm", "Are you want to logout?", [{
      text: "Cancel",
      onPress: ()=> console.log("Cancel Logout"),
      style: 'cancel'
    },
    {
      text: "Logout",
      onPress: ()=> handleLogout() ,
      style: 'destructive'
    }
  ])
  }

  const handlePress = async (option: accountOptionType) => {
    if(option.title == "Logout"){
      showLogoutAlert();
    }

    if(option.routeName) router.push(option.routeName);
  }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" style={{ marginVertical: spacingY._10 }}/>

        <View style={styles.userInfo}>
          <View>
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit='cover'
              transition={100}
            />
          </View>
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={'600'}>
              <Text>{user?.name}</Text>
            </Typo>
            <Typo size={16} fontWeight={'400'}>
              <Text>{user?.email}</Text>
            </Typo>
          </View>
        </View>

        <View style={styles.accountOptions}>
          {accountOptions.map((option, index) => {
            return (
              <Animated.View 
              key={index.toString()}
              entering={FadeInDown.delay(index*50)
                .springify()
                .damping(14)
              }
              style={styles.listItem}>
                <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(option) }>
                  <View
                  style={[
                    styles.listIcon,
                    {
                      backgroundColor: option?.bgColor
                    }
                  ]}>
                    {option.icon && option.icon}
                  </View>
                  <Typo size={16} style={{ flex:1 }} fontWeight={500}>
                    {option.title}
                  </Typo>
                  <Icons.CaretRight
                    size={verticalScale(20)}
                    weight="bold"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </Animated.View>
            )
          })}
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    gap: spacingY._15,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 50,
    padding: 5,
  },
  nameContainer: {
    alignItems: 'center',
    gap: verticalScale(5),
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    borderRadius: radius._15,
    backgroundColor: colors.neutral500,
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'continuous',
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  }
})