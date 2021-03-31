import { map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, ScrollView } from 'react-native'
import { IconButton, Title, Text } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { getMovieByIdApi } from '../api/movie'
import ModalVideo from '../components/ModalVideo'
import { BASE_PATH_IMG } from '../utils/constants'
import usePreference from '../hooks/usePreference'

import starDark from '../assets/png/starDark.png'
import starLight from '../assets/png/starLight.png'

const Movie = ({route}) => {
    const { id } = route.params
    const [movie, setMovie] = useState(null)
    const [show, setShow] = useState(false)

    const getMovieById = async(idMovie) => {
        const response = await getMovieByIdApi(idMovie)
        setMovie(response)
    }

    useEffect(() => {
        getMovieById(id)
    }, [])

    if(!movie) return null

    return (
        <>
            <ScrollView>
                <MovieImage posterPath={movie.poster_path} />
                <MovieTrailer setShow={setShow} />
                <MovieTitle movie={movie} />
                <MovieRating voteCount={movie.vote_count} voteAverage={movie.vote_average}/>
                <Text style={styles.overview}>{movie.overview}</Text>
                <Text style={[styles.overview, {marginBottom: 30}]}>Fecha de lanzamiento: {movie.release_date}</Text>
            </ScrollView>
            <ModalVideo show={show} setShow={setShow} idMovie={id} />
        </>
    )
}

const MovieImage = ({posterPath}) => {

    const imgUrl = `${BASE_PATH_IMG}/w500${posterPath}`

    return(
        <View style={styles.viewPoster}>
            <Image 
                style={styles.poster}
                source={{uri: imgUrl}}
            />
        </View>
    )
}

const MovieTrailer = ({setShow}) => {
    return (
        <View style={styles.viewPlay}>
            <IconButton 
                icon='play'
                color='#000'
                size={30}
                style={styles.play}
                onPress={() => setShow(true)}
            />
        </View>
    )
}

const MovieTitle = ({movie}) => {
    return (
        <View style={styles.viewInfo}>
            <Title>{movie.title}</Title>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.viewGenres}>
                {
                    map(movie.genres, (genre) => (
                        <Text 
                            key={genre.id}
                            style={styles.genre}
                        >
                            {genre.name}
                        </Text>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const MovieRating = ({voteCount, voteAverage}) => {
    
    const media = voteAverage/2 
    
    const { theme } = usePreference()

    return (
        <View style={styles.viewRating}>
            <Rating 
                type='custom'
                ratingImage={theme === 'dark' ? starDark : starLight}
                ratingColor='#ffc205'
                ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
                startingValue={ media }
                imageSize={20}
                style={{marginRight: 15}}
            />
            <Text style={{ fontSize: 16, marginRight: 5}}>{media}</Text>
            <Text style={{ fontSize: 12, color: '#8697a5'}}>{voteCount} votos</Text>
        </View>
    )
}

export default Movie

const styles = StyleSheet.create({
    viewPoster:{
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    poster: {
        width: '100%',
        height: 500,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    viewPlay: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    play: {
        backgroundColor: '#fff',
        marginTop: -40,
        marginRight: 30,
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    viewInfo: {
        marginHorizontal: 30
    },
    viewGenres: {
        flexDirection: 'row'
    },
    genre: {
        marginRight: 10,
        color: '#8697a5'
    },
    viewRating: {
        marginHorizontal: 30,
        marginTop: 10,
        flexDirection: 'row',
        textAlign: 'center'
    },
    overview: {
        marginHorizontal: 30, 
        marginTop: 20,
        textAlign: 'justify',
        color: '#8697a5'
    }
})
