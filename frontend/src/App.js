import React from 'react';

import './global.css';

import Routes from './routes';//Não é necessário colocar o arquivo de js que vai ser carregado porque o react
//sempre procura o arquivo index lá dentro

// Para gerenciar as rotas da aplicação, instale através do npm, npm install react-router-dom
// Estado em React: informação mantida pelo componente
// Para chamar um estado é necessário importá-lo
// JSX (JavaScript XML) - XML é a síntaxe do HTML
// JSX é quando escrevemos o html dentro do js
// Um componente no React é uma função que retorna html
// Propriedades no react = Atributos do HTML mais ou menos, tem a mesma síntaxe, inclusive
// Mas são atributos passados para componentes, ao invés de HTML
// Componente do React precisa ser sempre com letra maiúscula
// No React não se pode colocar um elemento abaixo do outro sem ter nada em volta, pois retorna apenas um elemento
// Quando se deseja chamar uma função no react, é necessário criá-la dentro dessa outra função, no caso App
// Quando um componente necessitar de manter ou manipular um valor, criaremos uma variável no formato de estado, 
// não no formato comum, pois só assim conseguiremos refletir alterações na interface visual além do script

function App() {
  /*
  //desestruturou-se o array para poder receber os valores no formato do useState
  const [counter, setCounter] = useState(0); //para poder usar o estado, é necessário declarar a variável como useState importado
  //ueseState nos retorna um array com duas posições Array[valor, função de atualização do valor], por isso pode-se colocar
  //a variável como const

  function increment(){
    setCounter(counter+1);             //não se pode manipular a variável do estado de uma forma direta no React,
    é necessário sobrepor a variável
  }
*/
  return (
    <Routes />   //Como o Header não vai ter conteúdo nesse caso, ou seja, só estou pegando o que foi escrito no arquivo
  );          //Header.js, não preciso abrir e fechar a tag, só fazer uma self close, pois nada irá nela
}

export default App;

/* Material de testes utilizado no Header.js
//para utilizar jsx, o react é obrigatório estar no arquivo


export default function Header({ children }){//dentro dos parametros, podemos colocar o objeto de atributos inteiro props, para recuperar
                                      //tudo da nossa chamada, ou, apenas as que desejo uasr com chaves { }
    return( //Sempre que quiser injetar um conteúdo, uma função javascript dentro do html do nosso componetne, 
        //é necessário abrir chaves
        <header>
            <h1>{children}</h1> 
        </header> // o props vem dos atributos setados quando chamo a função header, no caso o title, por isso eu pego
    );            // o props.title, para acessar o título escrito dentro do App.js
                  // props.children para acessar todos os filhos, seja html ou atributos dentro da chamada
}
*/
