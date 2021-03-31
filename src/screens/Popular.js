import React, { useEffect, useState } from 'react'
import { map } from 'lodash'
import { Image, StyleSheet, View } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Text, Title, Button } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { getPopularMoviesApi } from '../api/movie'
import { BASE_PATH_IMG } from '../utils/constants'
import starDark from '../assets/png/starDark.png'
import starLight from '../assets/png/starLight.png'
import noImage from '../assets/png/default-imgage.png'
import usePreference from '../hooks/usePreference'

const Popular = ({navigation}) => {

    const [movies, setMovies] = useState(null)
    const [showBtn, setShowBtn] = useState(true)
    const [page, setPage] = useState(1)

    const {theme} = usePreference()

    const getPopular = async(page) => {
        const resp = await getPopularMoviesApi(page)
        const totalPages = resp.total_pages
        if(page<totalPages) {
            if(!movies) {
                setMovies(resp.results)
            } else {
                setMovies([...movies, ...resp.results])
            }
        } else {
            setShowBtn(false)
        }
    }

    useEffect(() => {
        getPopular(page)
    }, [page])

    return (
        <ScrollView>
            {
                map(movies, (movie, index) => (
                    <Movie key={index} movie={movie} navigation={navigation}/>
                ))
            }
            {
                showBtn && (
                    <Button
                        mode='contained'
                        contentStyle={styles.loadMoreContainer}
                        style={styles.loadMore}
                        labelStyle={{color: theme === 'dark' ? '#fff' : '#000'}}
                        onPress={() => setPage( page + 1 )}
                    >
                        Cargar mas...
                    </Button>
                )
            }
        </ScrollView>
    )
}

const Movie = ({movie, navigation}) => {

    const {poster_path, title, release_date, vote_count, vote_average, id} = movie
    const imgUrl = `${BASE_PATH_IMG}/w500${poster_path}`

    const onNavigation = () => {
        navigation.navigate('movie', { id })
    }

    return (
        <TouchableWithoutFeedback onPress={onNavigation}>
            <View style={styles.movie}>
                <View style={styles.left}>
                    <Image 
                        style={styles.image}
                        source={ 
                            poster_path 
                            ?
                            {uri: imgUrl}
                            :
                            noImage
                        }
                    />
                </View>
                <View>
                    <Title>{title}</Title>
                    <Text>{release_date}</Text>
                    <MovieRating voteCount={vote_count} voteAverage={vote_average}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
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

export default Popular

const styles = StyleSheet.create({
    movie: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        marginRight: 20
    },
    image:{
        width: 100,
        height: 150,
    },
    viewRating: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    loadMoreContainer: {
        paddingTop: 10,
        paddingBottom: 30,
    },
    loadMore: {
        backgroundColor: 'transparent'
    }
})
