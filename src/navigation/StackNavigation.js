import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Movie from '../screens/Movie'
import Popular from '../screens/Popular'
import News from '../screens/News'
import Search from '../screens/Search'
import { IconButton } from 'react-native-paper'

createStackNavigator

const Stack = createStackNavigator()

const StackNavigation = ({navigation}) => {

    const buttonLeft = () => {
        return (
            <IconButton 
                icon='menu'
                onPress={() => navigation.openDrawer()}
            />
        )
    }

    const buttonRight = () => {
        return (
            <IconButton 
                icon='magnify'
                onPress={ () => navigation.navigate('search')}
            />
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='home'
                component={Home}
                options={{title: 'The Movie App', headerLeft: () => buttonLeft(), headerRight: () => buttonRight()}}
            />
            <Stack.Screen 
                name='movie'
                component={Movie}
                options={{title: '', headerTransparent: true, headerRight: () => buttonRight()}}
            />
            <Stack.Screen 
                name='news'
                component={News}
                options={{title: 'Nuevas Peliculas', headerLeft: () => buttonLeft(), headerRight: () => buttonRight() }}
            />
            <Stack.Screen 
                name='populares'
                component={Popular}
                options={{title: 'Peliculas Populares', headerLeft: () => buttonLeft(), headerRight: () => buttonRight()}}
            />
            <Stack.Screen 
                name='search'
                component={Search}
                options={{title: 'Buscador', headerTransparent: true}}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation