import React, { useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { StyleSheet, View } from 'react-native'
import { Drawer, Text, Switch, TouchableRipple } from 'react-native-paper'
import usePreference from '../hooks/usePreference'

const DrawerContent = ({navigation}) => {

    const [active, setActive] = useState('home')
    const { theme, handleTheme } = usePreference()

    const handleNavigation = (screen) => {
        setActive(screen)
        navigation.navigate(screen)
    }

    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    label='Inicio'
                    active={active === 'home'}
                    onPress={() => handleNavigation('home')}
                />
                <Drawer.Item
                    label='Nuevas peliculas'
                    active={active === 'news'}
                    onPress={() => handleNavigation('news')}
                />
                <Drawer.Item
                    label='Peliculas populares'
                    active={active === 'populares'}
                    onPress={() => handleNavigation('populares')}
                />
            </Drawer.Section>
            <Drawer.Section title='Opciones'>
                <TouchableRipple>
                    <View style={styles.preference}>
                        <Text>{theme === 'dark' ? 'Tema oscuro' : 'Tema claro'}</Text>
                        <Switch value={theme === 'dark'} onValueChange={handleTheme} />
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16
    }
})
