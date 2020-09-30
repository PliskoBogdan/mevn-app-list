const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {PORT, mongoUri} = require('./config')
const bucketListItemRoutes = require('./routes/api/bucketListItems')
const path = require('path')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('DB connect'))
.catch((err) => console.log(err))
app.use('/api/bucketListItems', bucketListItemRoutes)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`listen port ${PORT}`))