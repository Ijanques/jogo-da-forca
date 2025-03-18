import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [palavra, setPalavra] = useState('');
  const [dica, setDica] = useState('');
  const [letrasTentadas, setLetrasTentadas] = useState([]);
  const [erros, setErros] = useState(0);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [palavraExibida, setPalavraExibida] = useState('');

  const palavras = [
    { palavra: 'banana', dica: 'Uma fruta amarela' },
    { palavra: 'computador', dica: 'Uma máquina eletrônica' },
    { palavra: 'elefante', dica: 'Um animal grande' },
    { palavra: 'girassol', dica: 'Uma flor amarela' },
    { palavra: 'javascript', dica: 'Uma linguagem de programação' },
    { palavra: 'montanha', dica: 'Uma grande formação rochosa' },
    { palavra: 'oceano', dica: 'Uma grande massa de água' },
    { palavra: 'piano', dica: 'Um instrumento musical' },
    { palavra: 'tigre', dica: 'Um animal selvagem' },
    { palavra: 'universo', dica: 'Tudo o que existe' }
  ];

  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = () => {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    const palavraSorteada = palavras[indiceAleatorio].palavra;
    const dicaSorteada = palavras[indiceAleatorio].dica;
    setPalavra(palavraSorteada);
    setDica(dicaSorteada);
    setLetrasTentadas([]);
    setErros(0);
    setFimDeJogo(false);
    setPalavraExibida('_'.repeat(palavraSorteada.length));
  };

  const tentarLetra = (letra) => {
    if (fimDeJogo) return;

    if (letrasTentadas.includes(letra)) {
      Alert.alert('Aviso', 'Você já tentou esta letra.');
      return;
    }

    setLetrasTentadas([...letrasTentadas, letra]);

    if (!palavra.includes(letra)) {
      setErros(erros + 1);
      if (erros + 1 >= 6) {
        setFimDeJogo(true);
        Alert.alert('Fim de Jogo', 'Você perdeu! A palavra era: ' + palavra);
      }
    } else {
      const novaPalavraExibida = palavra
        .split('')
        .map((char, index) => (letrasTentadas.includes(char) || char === letra ? char : '_'))
        .join('');
      setPalavraExibida(novaPalavraExibida);

      if (!novaPalavraExibida.includes('_')) {
        setFimDeJogo(true);
        Alert.alert('Parabéns', 'Você ganhou!');
      }
    }
  };

const renderizarForca = () => {
  const partes = [
    " _______ ",
    " |      | ",
    ` |      ${erros > 0 ? 'O' : ' '}`,
    ` |     ${erros > 2 ? '/' : ' '}${erros > 1 ? '|' : ' '}${erros > 3 ? '\\' : ' '}`,
    ` |     ${erros > 4 ? '/' : ' '}${erros > 5 ? '\\' : ' '}`,
    " |        ",
    "_|______  ",
  ];

  return (
    <View style={styles.forca}>
      {partes.map((linha, index) => (
        <Text key={index} style={styles.forcaParte}>
          {linha}
        </Text>
      ))}
    </View>
  );
};

    

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Forca</Text>
      <Text style={styles.dica}>Dica: {dica}</Text>
      <Text style={styles.palavra}>{palavraExibida}</Text>
      <Text style={styles.erros}>Erros: {erros}/6</Text>
      {renderizarForca()}
      <TextInput
        style={styles.entrada}
        maxLength={1}
        onChangeText={(texto) => tentarLetra(texto.toLowerCase())}
        value=""
      />
      <Button title="Reiniciar" onPress={iniciarJogo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dica: {
    fontSize: 18,
    marginBottom: 10,
  },
  palavra: {
    fontSize: 22,
    marginBottom: 20,
    letterSpacing: 10,
  },
  erros: {
    fontSize: 18,
    marginBottom: 10,
  },
  forca: {
    marginBottom: 20,
    alignItems: 'center',
  },
  forcaParte: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'monospace',
    textAlign: 'left',
    width: 120,
  },
  entrada: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
  },
});