import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform, Alert,
  ActivityIndicator, FlatList
} from 'react-native';
import { validarRetirada } from './utils';

const API_URL = 'https://6a2b3540b687a7d5cbc4f2f8.mockapi.io/api/v1/Materias';

export default function App() {
  const [materiais, setMateriais] = useState([]);
  const [form, setForm] = useState({ nome: '', quantidade: '' });
  const [loading, setLoading] = useState({ list: false, add: false });
  const [retiradas, setRetiradas] = useState({});
  const [processando, setProcessando] = useState({});
  const [busca, setBusca] = useState('');

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

  useEffect(() => {
  if (process.env.NODE_ENV !== 'test') {
    fetchMateriais();
  }
}, []);

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

  const handleRetiradaChange = (id, valor) => {
    setRetiradas(prev => ({ ...prev, [id]: valor }));
  };

  const baixarEstoque = async (item) => {
    const valorDigitado = retiradas[item.id];
    const quantidadeRetirada = Number(valorDigitado);

    if (!valorDigitado || isNaN(quantidadeRetirada)) {
      Alert.alert('Atenção', 'Informe uma quantidade válida para retirada.');
      return;
    }

    if (!validarRetirada(item.quantidade, quantidadeRetirada)) {
      Alert.alert(
        'Operação inválida',
        `Não é possível retirar ${quantidadeRetirada} unidade(s). Estoque atual: ${item.quantidade}.`
      );
      return;
    }

    const novoEstoque = item.quantidade - quantidadeRetirada;

    setProcessando(prev => ({ ...prev, [item.id]: true }));
    try {
      const response = await fetch(`${API_URL}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, quantidade: novoEstoque }),
      });
      const atualizado = await response.json();
      setMateriais(prev => prev.map(m => (m.id === item.id ? atualizado : m)));
      setRetiradas(prev => ({ ...prev, [item.id]: '' }));
    } catch (e) {
      Alert.alert('Erro', 'Falha ao atualizar o estoque.');
    } finally {
      setProcessando(prev => ({ ...prev, [item.id]: false }));
    }
  };

  const excluirMaterial = async (item) => {
    setProcessando(prev => ({ ...prev, [item.id]: true }));
    try {
      const response = await fetch(`${API_URL}/${item.id}`, { method: 'DELETE' });
      if (!response.ok && response.status !== 404) {
        throw new Error('Falha ao excluir');
      }
      setMateriais(prev => prev.filter(m => m.id !== item.id));
    } catch (e) {
      Alert.alert('Erro', 'Falha ao excluir o material.');
    } finally {
      setProcessando(prev => ({ ...prev, [item.id]: false }));
    }
  };

  const materiaisFiltrados = materiais.filter(m =>
    m.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View
      style={[styles.card, item.quantidade < 10 && styles.cardCritico]}
      accessibilityLabel={item.quantidade < 10 ? 'estoque-critico' : undefined}
    >
      <View style={styles.cardTopRow}>
        <View style={styles.cardIcon}><Text>📦</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardNome}>{item.nome}</Text>
          <Text style={styles.cardQtd}>Qtd: {item.quantidade}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: item.quantidade < 10 ? '#fdecea' : '#eafaf1' }]}>
          <Text style={[styles.badgeText, { color: item.quantidade < 10 ? '#c0392b' : '#1e8449' }]}>
            {item.quantidade < 10 ? 'CRÍTICO' : 'OK'}
          </Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TextInput
          testID="input-retirada"
          style={styles.inputRetirada}
          placeholder="Qtd a retirar"
          keyboardType="numeric"
          value={retiradas[item.id] || ''}
          onChangeText={(t) => handleRetiradaChange(item.id, t)}
        />
        <TouchableOpacity
          testID="btn-baixar"
          style={[styles.btnSmall, styles.btnBaixar]}
          onPress={() => baixarEstoque(item)}
          disabled={!!processando[item.id]}
        >
          {processando[item.id]
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={styles.btnSmallText}>Baixar</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          testID="btn-excluir"
          style={[styles.btnSmall, styles.btnExcluir]}
          onPress={() => excluirMaterial(item)}
          disabled={!!processando[item.id]}
        >
          <Text style={styles.btnSmallText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5276" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.title}>🏥 Almoxarifado</Text>
          <Text style={styles.subtitle}>Controle de Insumos</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            testID="input-nome"
            style={styles.input}
            placeholder="Nome"
            value={form.nome}
            onChangeText={t => setForm({ ...form, nome: t })}
          />
          <TextInput
            testID="input-quantidade"
            style={styles.input}
            placeholder="Qtd"
            value={form.quantidade}
            onChangeText={t => setForm({ ...form, quantidade: t })}
            keyboardType="numeric"
          />
          <TouchableOpacity testID="btn-cadastrar" style={styles.btn} onPress={cadastrar} disabled={loading.add}>
            {loading.add ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Cadastrar</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Inventário</Text>
          <TouchableOpacity onPress={fetchMateriais}>
            <Text style={{ color: '#aed6f1' }}>↻ Atualizar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            testID="input-busca"
            style={styles.inputBusca}
            placeholder="🔍 Pesquisar material..."
            placeholderTextColor="#aaa"
            value={busca}
            onChangeText={setBusca}
          />
          <Text testID="total-itens" style={styles.totalItens}>
            {materiaisFiltrados.length} {materiaisFiltrados.length === 1 ? 'item' : 'itens'}
          </Text>
        </View>

        {loading.list ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            testID="lista-materiaLs"
            data={materiaisFiltrados}
            keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
            ListEmptyComponent={<Text style={styles.empty}>Nenhum material encontrado.</Text>}
          />
        )}
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
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 10 },
  cardCritico: { backgroundColor: '#fdecea', borderWidth: 1, borderColor: '#e74c3c' },
  cardTopRow: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  cardNome: { fontWeight: 'bold' },
  cardQtd: { color: '#666', fontSize: 12 },
  badge: { padding: 4, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  empty: { color: '#aed6f1', textAlign: 'center', marginTop: 40 },
  cardActions: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 8 },
  inputRetirada: { flex: 1, borderWidth: 1, borderColor: '#dce3ea', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6, fontSize: 13 },
  btnSmall: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  btnBaixar: { backgroundColor: '#1a5276' },
  btnExcluir: { backgroundColor: '#c0392b' },
  btnSmallText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 10, marginBottom: 4, gap: 8 },
  inputBusca: { flex: 1, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14 },
  totalItens: { color: '#aed6f1', fontSize: 13, fontWeight: 'bold' },
});