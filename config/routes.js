module.exports = app => {
    // Movies Routes    
    app.route('/movies')
        .post(app.api.movie.saveMovie)
        .get(app.api.movie.getMovies)
    
    app.route('/movies/:id')
        .get(app.api.movie.getMovieById)
    
    app.route('/movies/:id/actors')
        .post(app.api.movie.addCast)
    
    // Genres Routes
    app.route('/genres')
        .post(app.api.genre.saveGenre)
        .get(app.api.genre.getGenres)
    
    app.route('/genres/:id')
        .get(app.api.genre.getGenreById)
    
    app.route('/genres/:id/movies')
        .get(app.api.genre.getMoviesByGenre)
    
    // Actors Routes

    app.route('/actors')
        .post(app.api.actor.saveActor)
        .get(app.api.actor.getActors)

    app.route('/actors/:id')
        .get(app.api.actor.getActorById)
}  