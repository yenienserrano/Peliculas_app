import { API_HOST, API_KEY, LANG } from "../utils/constants"

export const getNewsMoviesApi = async( page = 1 ) => {
    const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`

    const resp = await fetch(url)
    const data = await resp.json()

    return data
} 

export const getGenreMovieApi = async(id) => {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`

    const arrayGenres = []

    const resp = await fetch(url)
    const data = await resp.json()

    id.forEach(id => {
        data.genres.forEach(item => {
            if(item.id === id) arrayGenres.push(item.name)
        })
    });


    return arrayGenres
}

export const getAllGenresApi = async() => {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`
    
    const resp = await fetch(url)
    const data = await resp.json()

    return data
}

export const getGenreMoviesApi = async(idGenre) => {
    const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&language=${LANG}&with_genres=${idGenre}`
    
    const resp = await fetch(url)
    const data = await resp.json()

    return data
}

export const getMovieByIdApi = async(idMovie) => {
    const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`
    
    const resp = await fetch(url)
    const data = await resp.json()

    return data
}


export const getVideoMovieApi = async(idMovie) => {
    const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`
    
    const resp = await fetch(url)
    const data = await resp.json()

    return data
}

export const getPopularMoviesApi = async(page = 1) => {
    const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`
    
    const resp = await fetch(url)
    const data = await resp.json()

    return data
}


export const searchMoviesApi = async(search) => {
    const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${search}`
    
    const resp = await fetch(url)
    const data = await resp.json()

    return data
}