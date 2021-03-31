import { map, size } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, View, Image } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Text, Searchbar } from 'react-native-paper'
import { searchMoviesApi } from '../api/movie'
import { BASE_PATH_IMG } from '../utils/constants'

const Search = ({navigation}) => {

    const [movies, setMovies] = useState(null)
    const [search, setSearch] = useState('')

    const searchMovie = async(search) => {
        const resp = await searchMoviesApi(search)
        setMovies(resp.results)
    }
    

    useEffect(() => {
        if( size(search) > 2 ){
            searchMovie(search)
        }
    }, [search])
    
    return (
        <SafeAreaView>
            <Searchbar 
                placeholder='Busca tu pelicula' 
                iconColor={Platform.OS === 'ios' && 'transparent' } 
                icon='arrow-left'
                style={styles.input}
                onChangeText={(e) => setSearch(e)}
            />
            <ScrollView>
                <View style={styles.container}>
                    {
                        map(movies,(movie, index) => (
                            <Movie key={index} movie={movie} navigation={navigation}/>
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const Movie = ({movie, navigation}) => {

    const {title, id, poster_path} = movie
    const imgUrl = `${BASE_PATH_IMG}/w500${poster_path}`

    const onNavigation = () => {
        navigation.navigate('movie', { id })
    }

    return (
        <TouchableWithoutFeedback onPress={onNavigation}>
            <View style={styles.movie}>
                {
                    poster_path 
                    ?
                    <Image
                        style={styles.image}
                        source={{uri: imgUrl}}
                    />
                    :
                    <Text>{title}</Text>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Search

const styles = StyleSheet.create({
    input: {
        marginTop: -3,
        backgroundColor: '#15212b'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    movie: {
        width: Dimensions.get('window').width / 2,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
})
