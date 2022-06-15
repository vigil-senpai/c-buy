module.exports = (mailAddress) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailAddress)) {
        return true
    }
    return false
}