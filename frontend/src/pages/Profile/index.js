import React, { useState, useEffect } from 'react';
//useEffect dispara alguma função em algum momento do componente, como eventos
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './style.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    //recebe dois parâmetros (qual função que quer que seja carregada, quando quer que seja carregada)
    //ou seja, toda vez que o segundo parâmetro for alterado, ele vai disparar a função, portanto
    //se o array estiver vazio, ele dispara uma unica vez no componente, por isso jogamos a função de 
    //listar os incidentes daquela ong toda vez que a ong for alterada, ou seja, um novo login for feito
    useEffect(() => {
        api.get('profile', {
            //vai buscar nos headers da requisição
            headers: {
                Authorization: ongId,
            }//usa o then para fazer isso somente ao fim da requisição ter dado certo
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            //Essa parte do código é pra depois que um item seja excluído, para que ele desapareça da tela
            setIncidents(incidents.filter(incident => incident.id !== id)); //sintaxe
            //vai filtrar o array de incidents e para cada incidente vai manter apenas os incidentes em que o id
            // é diferente do parametro id deletado pelo handleDeleteIncident
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear(); //limpa o local storage
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button"
                 onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul> {/* No caso, utiliza-se o map para percorrer os dados e retornar os valores necessários
                     além disso, a arrow function a seguir não está em chaves porque não é necessário dar return, por isso
                     as chaves funcionam como devem, no caso, o map também já faz a função de iteração, ou seja,
                     cria um loop e percorre retornando a cada vez uma nova resposta */}
                {incidents.map(incident => (
                    <li key={incident.id}> {/* jogamos essa key para depois poder recuperar qual é o nosso id
                    quando quisermos apagar esse incidente, no caso*/}
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p> {/* Classe global js para formatações internacionais
                    tipo dinheiro, datas, etc */}

                        <button type="button">
                            <FiTrash2 size={20} color="#a8a8b3"
                                onClick={() => handleDeleteIncident(incident.id)}>
                                    {/* é necessário passar uma função dentro dessa chamada
                                    do onClick, porque se não, assim que ele cria o componente ele ia chamar essa função, ou seja
                                    ia deletar todos os incidentes enquanto ele os cria */}
                            </FiTrash2>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}