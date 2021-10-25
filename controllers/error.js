exports.get404 = (req, res, next) => {
    res.status(404).send('Bad Request')
}

exports.get400 = (req, res, next) => {
    res.status(404).send()
}
exports.get500 = (req, res, next) => {
    res.status(404).send('internal server Error')
}