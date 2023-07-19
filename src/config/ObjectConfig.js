const {connect} = require('mongoose')

let url = 'mongodb+srv://cessarmart:390ljtiALsv7UcP8@cluster0.lr2zwx0.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    jwt_secret_key: 'palabraJwtSecreto',
    connectDB: async ()=> {
    connect(url)
    console.log('base de datos conectada')
}
}