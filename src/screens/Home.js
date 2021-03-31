import { map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Title, Text } from 'react-native-paper'
import { getAllGenresApi, getGenreMoviesApi, getNewsMoviesApi } from '../api/movie'
import CarouselMulti from '../components/CarouselMulti'
import CaruselVertical from '../components/CaruselVertical'

const Home = ({navigation}) => {

    const [newsMovies, setNewsMovies] = useState(null)
    const [genreList, setGenreList] = useState(null)
    const [genreMovies, setGenreMovies] = useState(null)
    const [genreSelected, setGenreSelected] = useState(28)

    const movies = async() => {
        const {results} = await getNewsMoviesApi()
        setNewsMovies(results)
    }

    const allGenres = async() => {
        const response = await getAllGenresApi()
        setGenreList(response.genres)
    }

    const allGenreMovies = async(genreId) => {
        const response = await getGenreMoviesApi(genreId)
        setGenreMovies(response.results)
    }

    useEffect(() => {
        allGenreMovies(genreSelected)
    }, [genreSelected])
    
    useEffect(() => {
        allGenres()
    }, [])

    useEffect(() => {
        movies()
    }, [])

    const onChangeGenre = (newGenreId) => {
        setGenreSelected(newGenreId)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                newsMovies &&
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas peliculas</Title>
                    <CaruselVertical data={newsMovies} navigation={navigation}/>
                </View>
            }

            <View style={styles.genres}>
                <Title style={styles.genresTitle}>
                    Peliculas por genero
                </Title>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
                    {
                        map(genreList, (genre, index) => (
                            <Text 
                                key={genre.id} 
                                style={[styles.genre, {color: genre.id !== genreSelected ? '#8697a5' : '#2697a5'}]}
                                onPress={() => onChangeGenre(genre.id)}
                            >
                                {genre.name}
                            </Text>
                        ))
                    }
                </ScrollView>
                {
                    genreMovies && (
                        <CarouselMulti data={genreMovies} navigation={navigation} />
                    )
                }
            </View>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    news: {
        marginVertical: 10
    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 22,
        fontWeight: 'bold'
    },
    genres: {
        marginTop: 20,
        marginBottom: 50
    },
    genresTitle: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22
    },
    genreList: {
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal:20,
        padding: 10,
    },
    genre: {
        marginRight: 10,

    }
})
