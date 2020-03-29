import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import './styles.css'; //é possível importar os estilos de dentro do js com o React

import heroesImg from '../../assets/heroes.png';  //importar imagem para dentro do componente no React

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

//sempre que quiser desestruturar e pegar só algumas informações de algum objeto, usa-se chaves e coloca
//o que deseja pegar
import { FiLogIn } from 'react-icons/fi'; //o pacote fi é o pacote de icones da feather icons
//pegamos o FiLogIn apenas, o react o considera um componente, então devemos escrevê-lo como tal

export default function Logon() {
    const [id, setId] = useState(''); 
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id});

            //pela necessidade do uso desses dois itens no resto da aplicação, salvamos
            //os dados no localstorage da máquina
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch(err){
            alert('Falha no login. Tente novamente');
        }
    }

    return (
        //   colocado essas informações no settings.json para poder utilizar a emmet do vscode no react
        //    (funções práticas de atalhos escritos como o lorem100 lá)
        //    "emmet.syntaxProfiles": { "javascript": "jsx"},
        // "emmet.includeLanguages": { "javascript": "javascriptreact" }
        // pacote de icones interessantes: feather icons, font awesome, material icons, no caso usamos o feather icons
        // instalado um pacote de icones pelo npm = npm install react-icons
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    {/* utliza-se className porque o react utiliza isto no jsx, porque class é uma palavra
                    reservada do js para criar classes */}
                    <Link to="/register" className="back-link"><FiLogIn size={16} color="#E02041" />Não tenho cadastro</Link>
                    {/* <a href="/register"><FiLogIn size={16} color="#E02041" />Não tenho cadastro</a>
                    não utilizamos mais o a no react, porque ele recarrega a página inteira pra carregar o link
                    e isso foge da proposta SPA do react, por isso, importado o link, dentro do link
                    não usamos href, e sim, o to="path" para chegarmos na rota */}
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}