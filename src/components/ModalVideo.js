import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { IconButton, Modal } from 'react-native-paper'
import WebView from 'react-native-webview'
import YouTube from 'react-native-youtube'
import { getVideoMovieApi } from '../api/movie'


const ModalVideo = ({show, setShow, idMovie}) => {

    const [video, setVideo] = useState(null)

    const getVideo = async(id) => {
        const res = await getVideoMovieApi(id)
        let idVideo = ''
        res.results.forEach(video => {
            if(video.site === 'YouTube' && !idVideo){
                idVideo = video.key
            }
        });
        setVideo(idVideo)
    }

    useEffect(() => {
        getVideo(idMovie)
    }, [])
    
    return (
        <Modal visible={show} contentContainerStyle={styles.modal}>
            {
                Platform.OS === 'ios' 
                ?
                <YouTube 
                    videoId={video}
                    style={styles.video}
                />
                :
                <WebView style={{width: 400}} source={{uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0`}} />
            }
            <IconButton 
                icon='close'
                onPress={() => setShow(false)}
                style={styles.close}
            />
        </Modal>
    )
}

export default ModalVideo

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#000',
        height: '120%',
        alignItems: 'center'
    },
    close: {
        backgroundColor: '#1ea1f2',
        width: 50,
        height: 50,
        borderRadius: 100,
        position: 'absolute',
        bottom: 100
    },
    video: {
        alignSelf: 'stretch',
        height: 300
    }
})
