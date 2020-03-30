import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
//permte fazer a navegação de páginas, como o History, aparentemente
//Esse touchable opacity é como se fosse um botão, mas ele torna tudo clicável e
//quando se clica ele diminui um pouco a opacidade
//Flatlist é responsável por fazer as nossas listagens no Native

import { Feather } from '@expo/vector-icons';
//para importar os icones do feather icons
//Quando é pra retornar um jsx, a gente sempre retorna em parenteses

import api from '../../services/api'
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);//começa sempre na página 1
    const [loading, setLoading] = useState(false);
    //precisa ser o mesmo nome da rota que colocamos
    //receberá o parâmetro do incidente e enviará para a próxima página que irá navegar
    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        //essa validação faz com que: se a página estiver de fato carregando, ele evita que o usuário
        //faça mais requisições para carregar mais paginas
        if (loading) {
            return;
        }
        //se o total for mairo que 0, ou seja, se já tiver carregado algo
        //e o número de incidentes carregados for igual ao total
        //ele não carrega mais nada, pois não há o que carregar
        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        //vai na api, pega no incidents na página passada no state
        const response = await api.get('incidents', {
            params: { page }
        });

        //essa é uma forma de anexar vetores, ou seja, jogar conteúdo de um dentro de outro com um push
        //o [...] significa TUDO que tem dentro do vetor, para sempre carregar novos itens e anexar nos antigos
        setIncidents([...incidents, ...response.data]);
        //pega o total de registros que tinhamos na header da requisição
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            {/* o data são os dados que vem dentro do nosso flatlist, ou seja, cada um dos incidentes entra como um dado
                renderItem é a função responsável por renderizar cada um dos itens da lista 
                keyExtractor funciona para a mesma função de pegar as keys na versão web, ele precisa saber quem é quem
                showsVerticalScrollIndicator é para mostrar ou não o indicador de scrolling*/}
            <FlatList data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                //carrega os novos itens quando chega ao fim da lista
                //aqui determina quando era começar a carregar novos itens, ou seja, quando o usuário tiver
                //atingido 20% da lista
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    //muda o nome do item para incident, para ficar mais fácil de abstrair na mente
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',
                            { style: 'currency', currency: 'BRL' }
                        ).format(incident.value)}</Text>
                        {/* precisa receber, mesmo que vazio esse onPress */}
                        <TouchableOpacity
                            style={styles.detailsButton}
                            //para passar parâmetros para uma função em jsx SEMPRE é necessário jogar como uma função, mesmo que vazia
                            onPress={() => navigateToDetail(incident)}>
                            <Text styles={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>)}
            />
        </View>
    )
}