import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; //funciona como o browser router
import { createStackNavigator } from '@react-navigation/stack';
//importa a stack do react native que gerencia a navegação

//cria navegação
const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Details';


export default function Routes(){
    return(
        //Sempre vai por volta de TODAS as nossas rotas
        <NavigationContainer>
            {/* retira as headers do navegador, já que faremos na mão */}
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                {/* recebe atributo de componentes */}
                <AppStack.Screen name="Incidents" component={Incidents}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
