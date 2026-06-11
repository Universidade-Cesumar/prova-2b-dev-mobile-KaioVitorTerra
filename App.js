import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5276" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏥 Almoxarifado</Text>
        <Text style={styles.headerSub}>Controle de Insumos de Saúde</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1a5276' },
  header: { backgroundColor: '#1a5276', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  headerSub: { fontSize: 13, color: '#aed6f1', marginTop: 2 },
});