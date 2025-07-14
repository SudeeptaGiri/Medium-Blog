const express = require('express')
const cors = require('cors');

const app = express();
const port = 8080;


const authRoutes = require('./routes/auth.routs');
const blogRoutes = require('./routes/blog.routs')

app.use(cors());
app.use(express.json());

app.use('/api/v1', authRoutes);
app.use('/api/v1', blogRoutes)


app.listen(port,(err)=>{
    if(err) console.log(err);
    console.log("Server is running at port",port," ....")
})