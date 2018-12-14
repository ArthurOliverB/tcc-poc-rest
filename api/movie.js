module.exports = app => {
    // Queries
    const getMovies = (req, res) => {
        app.db('movies')
            .then(data => res.json(data))
            .catch(err => res.status(500).send(err))
    }
    const getMovieById = (req, res) => {
        app.db('movies')
            .where({id: req.params.id})
            .first()
            .then(data => res.json(data))
            .catch(err => res.status(500).send(err))
    }
    // Mutations
    const saveMovie = (req, res) => {
        const movie = { ...req.body }
        if(req.params.id) movie.id = req.params.id

        app.db('movies')
            .insert(movie)
            .then(data => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
    const addCast = (req, res) => {
        const cast = req.body.cast
        
        
        const movieId = req.params.id

        console.log(movieId);

        const newCast = cast.map(item => {
            return {movie_id: movieId, actor_id: item}
        })
        app.db.batchInsert('movies_actors',newCast)
            .then(data => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } 
    return { saveMovie, getMovies, getMovieById, addCast}
}