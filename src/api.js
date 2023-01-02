import axios from 'axios';

export const moviePopuler = async () =>{
    const moviePopuler = await axios.get(
        `${import.meta.env.VITE_BASEURL}/movie/upcoming?api_key=${import.meta.env.VITE_APIKEY}`
    )
    return moviePopuler.data.results
}

export const TrendingMovie = async (props) =>{
    const TrendingMovie = await axios.get(
        `${import.meta.env.VITE_BASEURL}/trending/movie/${props}?api_key=${import.meta.env.VITE_APIKEY}`
    )
    return TrendingMovie.data.results
}

export const PopulerMovie = async () =>{
    const PopulerMovie = await axios.get(
        `${import.meta.env.VITE_BASEURL}/movie/popular/?api_key=${import.meta.env.VITE_APIKEY}`
    )
    return PopulerMovie.data.results
}

export const MovieDetail = async (id) =>{
    const movieDetail = await axios.get(
        `${import.meta.env.VITE_BASEURL}/movie/${id}?api_key=${import.meta.env.VITE_APIKEY}`
    )
    return movieDetail.data
}

export const ImageActor = async (idActor) =>{
    const actor = await axios.get(
        `${import.meta.env.VITE_BASEURL}/movie/${idActor}/credits?api_key=${import.meta.env.VITE_APIKEY}`
    )
    return actor.data.cast
}

export const Genre = async() => {
    const genre = await axios.get(
        `${import.meta.env.VITE_BASEURL}/genre/movie/list?api_key=${import.meta.env.VITE_APIKEY}`
    )
    return genre.data.genres
}

export const SearchMovie = async(query) =>{
        const searchMovie = await axios.get(
            `${import.meta.env.VITE_BASEURL}/search/movie?api_key=${import.meta.env.VITE_APIKEY}&query=${query}`
        )
        return searchMovie
}
