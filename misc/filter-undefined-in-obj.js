module.exports = (obj) => {
    for(let key in obj) {
        if(!obj[key]) {
            delete obj[key]
        }
    }
    return obj
}