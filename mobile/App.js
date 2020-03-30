import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//importamos as rotas criadas
import Routes from './src/routes';

//O React Native não tem as mesmas tags do HTMl
//Temos a Tag View (entra num lugar duma div, header, etc, containers em geral)
//Tag Text é utilizada para qualquer tipo de texto
//São os componentes NATIVOS
//Não tem Semântica, todo text é text
//Estilização muda também
//Recebe estilizações da classe Stylesheet do native
//Flexbox no react native interage de forma diferente, todos eles tem display: flex por padrão
//Não existe display block, etc
//Onde teria hífen no css, fazemos camelCase
//Valores sem número precisam de aspas
//Não existe herança de estilos no Native


export default function App() {
  return (
    <Routes />
  );
}