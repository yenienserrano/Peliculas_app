import React, { useEffect, useState } from 'react'
import { map, size } from 'lodash'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Title, Text } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel'
import { getGenreMovieApi } from '../api/movie'
import { BASE_PATH_IMG } from '../utils/constants'

const { width } = Dimensions.get('window')
const widthItem = Math.round(width * 0.7)

const CaruselVertical = ({data, navigation}) => {
    return (
        <Carousel 
            layout='default'
            data={data}
            renderItem={ (item) => <RenderItem item={item} navigation={navigation}/> }
            sliderWidth={width}
            itemWidth={widthItem}
        />
    )
}

const RenderItem = ({item, navigation}) => {
    
    const {genre_ids, id, title, poster_path} = item.item
    const imgUrl = `${BASE_PATH_IMG}/w500${poster_path}`
    
    const [genres, setGenres] = useState(null)
    
    useEffect(() => {
        genresMovies()
    }, [])

    const genresMovies = async() => {
        const generos = await getGenreMovieApi(genre_ids)
        setGenres(generos)
    }

    const onNavigate = () => {
        navigation.navigate('movie', {id})    
    }
    
    return (
        <TouchableWithoutFeedback onPress={onNavigate}>
            <View style={styles.card}>
                <Image style={styles.image} source={{uri: imgUrl}} />
                <Title style={styles.title}>{title}</Title>
                <View style={styles.genres}>
                    {
                        genres && (
                            map(genres, (genre, index) => (
                                <Text key={index} style={styles.genre}>
                                    {genre}
                                    {index !== size(genres) - 1 && ', '}
                                </Text>
                            ))
                        )
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CaruselVertical

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    image:{
        width: '100%',
        height: 450,
        borderRadius: 20,
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    genres: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    genre: {
        fontSize: 12,
        color: '#8997a5'
    }
})
