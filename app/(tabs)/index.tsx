import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typo from '@/components/Typo';
import Button from '@/components/Button';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/Header';
import MouldWrapper from '@/components/MouldWrapper';

const Home = () => {
  const handleLogout = async () => {
    // Implement logout logic here, e.g., Firebase signOut
    await signOut(auth);
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Mould Health Checkup" style={{ marginVertical: spacingY._10 }} />
        <MouldWrapper/>
      </View>
    </ScreenWrapper>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
})