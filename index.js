require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routers/routes')
require('./config/db')

const app = express()
app.use(cors());
app.use(express.json())
app.use(router)

const PORT = 3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running in port : ${PORT} and waiting for client request`);
})

app.get('/test', (req, res) => {
    res.json({ message: 'CORS test successful' });
});

app.get("/", (req, res) => {
    res.status(200).send("<h3>Server running and waiting for client requests</h3>");
  });
