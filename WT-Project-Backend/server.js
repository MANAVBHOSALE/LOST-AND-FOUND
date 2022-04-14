const express=require('express')
const mongoose=require('mongoose')
const app=express()
const ur=require('./routes/userRoutes')
const lr=require('./routes/lostRoutes')
const fr=require('./routes/foundRoutes')
const cn=require('./routes/contactRoutes')

const bodyparser=require('body-parser')
const cors=require('cors')
app.use(cors())
app.use(bodyparser.json())

app.listen(3000,()=>
{
    console.log('Server started on port 3000')
})

const db='mongodb+srv://admin:admin@cluster0.jekpe.mongodb.net/LostandFound?retryWrites=true&w=majority'
mongoose.connect(db,()=>
{
    console.log('Connected to Database')
})

app.use('/login',ur)
app.use('/lost',lr)
app.use('/found',fr)
app.use('/contact',cn)


