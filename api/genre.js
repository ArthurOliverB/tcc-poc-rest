module.exports = app => {
    // Queries
    const getGenres = (req, res) => {
        app.db('genres')
            .then(data => res.json(data))
            .catch(error => res.status(500).send(error))
    }
    const getGenreById = (req, res) => {
        app.db('genres')
            .where({id: req.params.id})
            .first()
            .then(data => res.json(data))
            .catch(error => res.status(500).send(error))
    }
    // Mutations
    const saveGenre = (req, res) => {
        const genre = { ...req.body }
        if(req.params.id) genre.id = req.params.id

        app.db('genres')
            .insert(genre)
            .then(data => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
    const getMoviesByGenre = (req, res) => {
        app.db('genres')
            .innerJoin('movies', 'genres.id', 'movies.genre_id')
            .where('movies.genre_id', req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(500).send(err))
    }
    return { saveGenre, getGenres, getGenreById, getMoviesByGenre }
}