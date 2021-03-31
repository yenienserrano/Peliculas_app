import { map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Button, Title, Text } from 'react-native-paper'
import { getNewsMoviesApi } from '../api/movie'
import usePreference from '../hooks/usePreference'
import { BASE_PATH_IMG } from '../utils/constants'

const News = ({navigation}) => {
    const {theme} = usePreference()
    const [movies, setMovies] = useState(null)
    const [page, setPage] = useState(1)
    const [showBtn, setShowBtn] = useState(true)

    const moviesNews = async(page) => {
        const resp = await getNewsMoviesApi(page)
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
        moviesNews(page)
    }, [page])

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    map(movies,(movie, index) => (
                        <Movie key={index} movie={movie} navigation={navigation}/>
                    ))
                }
            </View>
            {
                showBtn
                &&
                <Button
                    mode='contained'
                    contentStyle={styles.loadMoreContainer}
                    style={styles.loadMore}
                    labelStyle={{color: theme === 'dark' ? '#fff' : '#000'}}
                    onPress={() => setPage( page + 1 )}>
                    Cargar mas...
                </Button>
            }
        </ScrollView>
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

export default News

const styles = StyleSheet.create({
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
    loadMoreContainer: {
        paddingTop: 10,
        paddingBottom: 30,
    },
    loadMore: {
        backgroundColor: 'transparent'
    }
})
