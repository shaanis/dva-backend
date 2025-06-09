const mongoose = require('mongoose')

const ConnectionString = process.env.CONNECTIONSTRING
mongoose.connect(ConnectionString).then(res=>{
    console.log("MongoDb connection successfully connected");
    
}).catch(err=>{
    console.log("Connection failed");
    console.log(err);
    
    
})