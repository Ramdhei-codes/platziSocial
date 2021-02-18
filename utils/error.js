function error(message, code) {
    let e = new Error(message)

    if(code) {
        e.statusCode = code
    }

    console.log(e)

    return e
}

module.exports = error