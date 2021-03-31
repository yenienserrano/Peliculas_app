import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import StackNavigation from './StackNavigation'
import DrawerContent from './DrawerContent'

const Navigation = () => {

    const Drawer = createDrawerNavigator()

    return (
        <Drawer.Navigator initialRouteName='app' drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name='app' component={StackNavigation} />
        </Drawer.Navigator>
    )
}

export default Navigation
