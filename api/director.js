module.exports = app => {
    const saveDirector = (req, res) => {
        const director = { ...req.body}
        console.log(req.body);
        
        app.db('actors')
            .insert(actor)
            .then(data => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
    const getDirectors = async (req, res) => {
        
        app.db('actors')
            .innerJoin('directors_movies', 'actors.id', 'directors_movies.director_id')
            .then(data => {
                
                const newData = data.map((director) => {
                    return {
                        id: director.id,
                        name: director.name,
                        bio: director.bio,
                        birthdate: director.birthdate
                    }
                })
                return res.json(newData)
            })
            .catch(err => res.status(500).send(err))        
    }
    const getDirectorById = (req, res) => {
        app.db('directors_movies')
            .innerJoin('actors', 'directors_movies.director_id', 'actors.id')
            .first()
            .then(data => res.json(data))
            .catch(err => res.status(500).send(err))
    }
    return { saveDirector, getDirectors, getDirectorById }
}