import React from 'react'
import { View, Text,ActivityIndicator, StyleSheet } from 'react-native'

const LoadingCircle = () => {
  return (
    <ActivityIndicator
        color="#999999"
        size="large"
        style={styles.loadingIndicator}
      />
  )
}

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 2,
  }
})

export default LoadingCircle
