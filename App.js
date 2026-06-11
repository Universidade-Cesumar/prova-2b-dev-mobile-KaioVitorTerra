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
import { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, StatusBar,
  TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,
  Alert, ActivityIndicator, FlatList,
} from 'react-native';

const API_URL = 'https://6a2b3540b687a7d5cbc4f2f8.mockapi.io/api/v1/Materias';

export default function App() {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [cadastrando, setCadastrando] = useState(false);

  useEffect(() => {
    fetchMateriais();
  }, []);

  const fetchMateriais = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMateriais(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o inventário.');
    } finally {
      setLoading(false);
    }
  };

  const cadastrarMaterial = async () => {
    if (!nome.trim()) { Alert.alert('Atenção', 'Informe o nome do material.'); return; }
    if (!quantidade.trim() || isNaN(Number(quantidade))) { Alert.alert('Atenção', 'Informe uma quantidade válida.'); return; }
    setCadastrando(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), quantidade: Number(quantidade) }),
      });
      const novoMaterial = await response.json();
      setMateriais((prev) => [novoMaterial, ...prev]);
      setNome('');
      setQuantidade('');
      Alert.alert('Sucesso', `"${novoMaterial.nome}" cadastrado!`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o material.');
    } finally {
      setCadastrando(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardIcon}><Text style={styles.cardIconText}>📦</Text></View>
      <View style={styles.cardBody}>
        <Text style={styles.cardNome}>{item.nome}</Text>
        <Text style={styles.cardQtd}>Quantidade: {item.quantidade}</Text>
      </View>
    </View>
  );

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
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Inventário</Text>
          <TouchableOpacity onPress={fetchMateriais}><Text style={styles.refreshBtn}>↻ Atualizar</Text></TouchableOpacity>
        </View>
        {loading ? <ActivityIndicator size="large" color="#1a5276" style={{ marginTop: 40 }} /> : (
          <FlatList testID="lista-materiais" data={materiais} keyExtractor={(item) => item.id?.toString()} renderItem={renderItem} contentContainerStyle={styles.list} />
        )}
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
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20, marginBottom: 8 },
  refreshBtn: { color: '#aed6f1', fontSize: 14, fontWeight: '600' },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  cardIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#eaf4fb', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardIconText: { fontSize: 20 },
  cardBody: { flex: 1 },
  cardNome: { fontSize: 15, fontWeight: '600', color: '#1c2833' },
  cardQtd: { fontSize: 13, color: '#7f8c8d', marginTop: 2 },
});
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, 
  TouchableOpacity, KeyboardAvoidingView, Platform, Alert, 
  ActivityIndicator, FlatList
} from 'react-native';

const API_URL = 'https://6a2b3540b687a7d5cbc4f2f8.mockapi.io/api/v1/Materias';

export default function App() {
  const [materiais, setMateriais] = useState([]);
  const [form, setForm] = useState({ nome: '', quantidade: '' });
  const [loading, setLoading] = useState({ list: false, add: false });

  const fetchMateriais = async () => {
    setLoading(prev => ({ ...prev, list: true }));
    try {
      const response = await fetch(API_URL);
      setMateriais(await response.json());
    } catch (e) {
      Alert.alert('Erro', 'Falha ao carregar dados.');
    } finally {
      setLoading(prev => ({ ...prev, list: false }));
    }
  };

  useEffect(() => { fetchMateriais(); }, []);

  const cadastrar = async () => {
    const { nome, quantidade } = form;
    if (!nome.trim() || !quantidade.trim()) return Alert.alert('Atenção', 'Preencha todos os campos.');
    
    setLoading(prev => ({ ...prev, add: true }));
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), quantidade: Number(quantidade) }),
      });
      const novo = await response.json();
      setMateriais([novo, ...materiais]);
      setForm({ nome: '', quantidade: '' });
    } catch (e) {
      Alert.alert('Erro', 'Falha ao cadastrar.');
    } finally {
      setLoading(prev => ({ ...prev, add: false }));
    }
  };

  const Card = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardIcon}><Text>📦</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardNome}>{item.nome}</Text>
        <Text style={styles.cardQtd}>Qtd: {item.quantidade}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: item.quantidade > 10 ? '#eafaf1' : '#fdf2f8' }]}>
        <Text style={styles.badgeText}>{item.quantidade > 10 ? 'OK' : 'BAIXO'}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5276" />
      <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.header}>
          <Text style={styles.title}>🏥 Almoxarifado</Text>
          <Text style={styles.subtitle}>Controle de Insumos</Text>
        </View>

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Nome" value={form.nome} onChangeText={t => setForm({...form, nome: t})} />
          <TextInput style={styles.input} placeholder="Qtd" value={form.quantidade} onChangeText={t => setForm({...form, quantidade: t})} keyboardType="numeric" />
          <TouchableOpacity style={styles.btn} onPress={cadastrar} disabled={loading.add}>
            {loading.add ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Cadastrar</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Inventário</Text>
          <TouchableOpacity onPress={fetchMateriais}><Text style={{color: '#aed6f1'}}>↻ Atualizar</Text></TouchableOpacity>
        </View>

        {loading.list ? <ActivityIndicator size="large" color="#fff" style={{marginTop: 20}} /> :
          <FlatList
            data={materiais}
            keyExtractor={item => item.id.toString()}
            renderItem={Card}
            contentContainerStyle={{ padding: 16 }}
            ListEmptyComponent={<Text style={styles.empty}>Nenhum material encontrado.</Text>}
          />
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a5276' },
  header: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#aed6f1' },
  form: { backgroundColor: '#fff', margin: 16, padding: 16, borderRadius: 12, elevation: 4 },
  input: { borderBottomWidth: 1, borderColor: '#eee', padding: 8, marginBottom: 10 },
  btn: { backgroundColor: '#1a5276', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center' },
  cardIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  cardNome: { fontWeight: 'bold' },
  cardQtd: { color: '#666', fontSize: 12 },
  badge: { padding: 4, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  empty: { color: '#aed6f1', textAlign: 'center', marginTop: 40 }
});