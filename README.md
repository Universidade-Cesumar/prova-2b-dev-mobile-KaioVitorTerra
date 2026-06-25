# Almoxarifado Mobile

Aplicativo de controle de estoque para materiais hospitalares, construído em React Native com Expo.

## Funcionalidades

- Listagem dinâmica de materiais usando `FlatList`
- Cadastro de novos insumos via MockAPI
- Retirada de estoque com validação contra valores negativos
- Exclusão de materiais com atualização de interface
- Pesquisa em tempo real com totalizador de itens
- Indicador visual de estoque crítico (menos que 10 unidades)

## Tecnologias

- React Native
- Expo
- Jest
- @testing-library/react-native

## TestIDs obrigatórios

- `input-nome`
- `input-quantidade`
- `btn-cadastrar`
- `lista-materiais`
- `input-retirada`
- `btn-baixar`
- `btn-excluir`
- `input-busca`
- `total-itens`

## Como rodar

1. Instale dependências:
   ```sh
   npm install
   ```
2. Inicie o Expo:
   ```sh
   npm start
   ```
3. Abra o app no Expo Go ou emulador.

## Testes

Execute:

```sh
npm test -- --runInBand
```

## Observações

- A interface usa a MockAPI para carregar e salvar materiais.
- Erros de rede são tratados com `try/catch` e alertas amigáveis.
