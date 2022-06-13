module.exports = async(req, res, next) => {
    const page = parseInt(req.params['page'])
    if(page) {
        const limit = req.body.limit || 10
        req.body.page = page
        req.body.offset = (page - 1) * limit
        req.body.limit = limit
    }
    next()
} 