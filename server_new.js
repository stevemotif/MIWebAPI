const express  = require('express');
const app = express()
const cake = require('./routes/product');

//routes
app.use('/cake',cake);



app.use(express.json())

app.get('', (req, res) => {
    res.send('Hello node api')
})

app.listen(3005, ()=> {
    console.log(`Node API app is running on 3000`)
})
