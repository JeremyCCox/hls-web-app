const express = require('express')
const fs = require('fs')
const app = express()
const port = 3001;

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.get('/files',async (req, res) => {

    await fs.readdir("streamStorage", (err, data) => {
        if (err) {
            res.send("Something went wrong!")
        } else {
            res.send(data)
        }
    })

    // fs.readdir('')
})

app.listen(port,()=>{
    console.log('Listening on port ', port)
})