import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ComparisonScreen from './src/screens/ComparisonScrenn'; 
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <ComparisonScreen />
        <StatusBar style="auto" />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});