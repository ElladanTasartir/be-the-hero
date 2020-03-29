import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //BrowserRouter - cuida das rotas do browser, complexo 
//(entrar em detalhes) de estudo depois, route, que são as próprias rotas, e Switch - 

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

//FOI INSTALADO UM CLIENTE HTTP AXIOS PARA PODER FAZER O BACKEND SE COMUNICAR COM O FRONT
//npm install axios

export default function Routes() {
    return ( //BrowserRouter precisa estar envolvendo tudo
        <BrowserRouter>
            <Switch>  {/* Switch não deixa mais de uma rota ser acessada por momento, igual um switch */}
                <Route path="/" exact component={Logon} /> {/* a path é só "/" porque é o primeiro endereço acessado
                pra não ter que digitar o endereço /login, por exemplo, a propriedade exact entra em jogo porque
                o Route não verifica se o endereço é exatamente igual ao digitado na url da página, por isso
                pelo Register possuir /register no seu começo, se ele ler a /, sem o exact, ele vai pegar a primeira
                rota que possuir barra, no caso, o Logon, com o exact ele só pega o Logon se for exatamente / que tiver
                digitado na rota */}
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}




