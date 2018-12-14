module.exports = app => {
    const saveActor = (req, res) => {
        const actor = { ...req.body}

        app.db('actors')
            .insert(actor)
            .then(data => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
    const getActors = (req, res) => {
        app.db('actors')
            .then(data => res.json(data))
            .catch(err => res.status(500).send(err))
    }
    const getActorById = (req, res) => {
        app.db('actors')
        .where({id: req.params.id})
        .first()
        .then(data => {
            console.log(data);
            res.json(data)
            
        })
        .catch(err => res.status(500).send(err))
    }
    return { saveActor, getActors, getActorById }
}