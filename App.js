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

import { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, StatusBar,
  TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5276" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🏥 Almoxarifado</Text>
          <Text style={styles.headerSub}>Controle de Insumos de Saúde</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Novo Material</Text>
          <TextInput
            testID="input-nome"
            style={styles.input}
            placeholder="Nome do material (ex: Luvas descartáveis)"
            placeholderTextColor="#aaa"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            testID="input-quantidade"
            style={styles.input}
            placeholder="Quantidade"
            placeholderTextColor="#aaa"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
          />
          <TouchableOpacity testID="btn-cadastrar" style={styles.btn}>
            <Text style={styles.btnText}>+ Cadastrar Material</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1a5276' },
  header: { backgroundColor: '#1a5276', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  headerSub: { fontSize: 13, color: '#aed6f1', marginTop: 2 },
  form: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: -8, borderRadius: 12, padding: 16, elevation: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1a5276', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#dce3ea', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, fontSize: 15, color: '#1c2833', backgroundColor: '#f8fafc', marginBottom: 10 },
  btn: { backgroundColor: '#1a5276', borderRadius: 8, paddingVertical: 13, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
import { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, StatusBar,
  TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,
  Alert, ActivityIndicator,
} from 'react-native';

const API_URL = 'https://6a2b3540b687a7d5cbc4f2f8.mockapi.io/api/v1/Materias';

export default function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [cadastrando, setCadastrando] = useState(false);

  const cadastrarMaterial = async () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do material.');
      return;
    }
    if (!quantidade.trim() || isNaN(Number(quantidade))) {
      Alert.alert('Atenção', 'Informe uma quantidade válida.');
      return;
    }
    setCadastrando(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), quantidade: Number(quantidade) }),
      });
      const novoMaterial = await response.json();
      setNome('');
      setQuantidade('');
      Alert.alert('Sucesso', `"${novoMaterial.nome}" cadastrado!`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o material.');
    } finally {
      setCadastrando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5276" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🏥 Almoxarifado</Text>
          <Text style={styles.headerSub}>Controle de Insumos de Saúde</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Novo Material</Text>
          <TextInput testID="input-nome" style={styles.input} placeholder="Nome do material" placeholderTextColor="#aaa" value={nome} onChangeText={setNome} />
          <TextInput testID="input-quantidade" style={styles.input} placeholder="Quantidade" placeholderTextColor="#aaa" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />
          <TouchableOpacity testID="btn-cadastrar" style={[styles.btn, cadastrando && styles.btnDisabled]} onPress={cadastrarMaterial} disabled={cadastrando}>
            {cadastrando ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>+ Cadastrar Material</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1a5276' },
  header: { backgroundColor: '#1a5276', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  headerSub: { fontSize: 13, color: '#aed6f1', marginTop: 2 },
  form: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: -8, borderRadius: 12, padding: 16, elevation: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1a5276', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#dce3ea', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, fontSize: 15, color: '#1c2833', backgroundColor: '#f8fafc', marginBottom: 10 },
  btn: { backgroundColor: '#1a5276', borderRadius: 8, paddingVertical: 13, alignItems: 'center', marginTop: 4 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});