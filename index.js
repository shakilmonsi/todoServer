
const express =require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
// require('dotenv').config()

const app = express ()
const cors= require('cors')
const port = process.env.PORT || 5000

// middiewarer 
app.use(cors())
app.use(express.json())

// DB_USER=doctorsProtalsFive-server
// DB_PASS=doctorsProtalsFive-server
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fm710lc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// dotenv crud mongodb example
 
async function run(){
  try{
const appointmentOptionCollextion = client.db('todoapp').collection('dodoappdata')
const updateTodoCollextion = client.db('todoapp').collection('updateTodo')

app.get('/todoapp', async (req, res) => {
  const query = {};
  const users = await appointmentOptionCollextion.find(query).toArray();
  res.send(users);
});


//  testing  code 


app.post('/todoapp', async (req, res) => {
    const user = req.body;
    console.log("user",user);
    const result = await appointmentOptionCollextion.insertOne(user);
    res.send(result);
});


app.delete("/todoapp/:id", async (req, res) => {
  const id = req.params.id;

  const filter = { _id: new ObjectId(id) };
  const result = await appointmentOptionCollextion.deleteOne(filter);
  res.send(result);
});


//update data 
app.put('/todoapp/:id', async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  console.log("updateData",updateData)




  // Validate if the provided ID is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    const result = await updateTodoCollextion.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.json({ success: true, message: 'Data updated successfully', result });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


  }
  finally{

  }

}
run().catch(console.log)

///
//  userName:userclasssix
//password: xJRbcfu51v9KBKiW

app.get('/',(req,res)=>{
        res.send('running')
})
app.listen(port,()=>{
        console.log(`running${port}`)
})