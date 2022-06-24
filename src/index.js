const express = require('express');
const env = require('dotenv');
const app = express()

// Environment Variable
env.config();

app.get('/', (req, res) =>{
    res.status(200).json({
        message: 'Hello form server'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
})