const express =require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express ()
const cors= require('cors')
const port = process.env.PORT || 5000
//nodejs setup and 5000 port
// middiewarer 
app.use(cors())
app.use(express.json())
const uri = "mongodb+srv://<bdtaskthre>:<i08fV13VlNBAG5DN>@cluster0.fm710lc.mongodb.net/?retryWrites=true&w=majority";
console.log(uri)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



///
//  userName:userclasssix
//password: xJRbcfu51v9KBKiW

app.get('/',(req,res)=>{
        res.send('running')
})
app.listen(port,()=>{
        console.log(`running${port}`)
})