const bcrypt = require('bcrypt')

//crear hash
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)

module.exports = {createHash, isValidPassword}