import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function Register() {
    //utilizando os useStates para capturar os dados do formulario em variaveis, ou seja, estados
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();
    //serve para fazer a navegação com o usuário, principalmente

    async function handleRegister(e) {
        //preventDefaults age aqui como método para impedir que a página recarregue ao fazer o submit, que é o padrão
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        //chamando um método post
        //a gente só joga data, porque por padrão o axios já envia em formato json
        try {
            //recebe o retorno do nosso método post na rota, ou seja
            //o método de post do back end da ongs vai ser acesasdo no localhost:3333/ongs, porque dissemos
            //que é da ong
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
            //Joga o usuário de volta na pasta raiz
        } catch(err) {
            alert('Erro no seu cadastrom. Tente novamente.');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link to="/" className="back-link"><FiArrowLeft size={16} color="#E02041" />Voltar para o Logon</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    {/* uma arrow function com o seguinte formato: e - parâmetro e retorno como setName(e.target.value); */}
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />
                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <input placeholder="UF"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            style={{ width: 80 }} />
                        {/* style do react, vem um objeto de javascript */}
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}