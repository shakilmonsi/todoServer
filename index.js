
// const express =require('express')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config()
// // require('dotenv').config()

// const app = express ()
// const cors= require('cors')
// const port = process.env.PORT || 5000

// // middiewarer 
// app.use(cors())
// app.use(express.json())

// // DB_USER=doctorsProtalsFive-server
// // DB_PASS=doctorsProtalsFive-server
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fm710lc.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// // dotenv crud mongodb example
 
// async function run(){
//   try{
// const appointmentOptionCollextion = client.db('todoapp').collection('dodoappdata')

// app.get('/todoapp', async (req, res) => {
//   const query = {};
//   const users = await appointmentOptionCollextion.find(query).toArray();
//   res.send(users);
// });


// //  testing  code 
// app.post('/todoapp', async (req, res) => {
//     const user = req.body;
//     console.log("user",user);
//     const result = await appointmentOptionCollextion.insertOne(user);
//     res.send(result);
// });


// app.delete("/todoapp/:id", async (req, res) => {
//   const id = req.params.id;
//   const filter = { _id: new ObjectId(id) };
//   const result = await appointmentOptionCollextion.deleteOne(filter);
//   res.send(result);
// });



//     // Update a todo item
//     // app.put('/todoapp/:id', async (req, res) => {
//     //   const id = req.params.id;
//     //   const filter = { _id: new ObjectId(id) };
//     //   const updateDoc = { $set: req.body };
//     //   const options = { returnDocument: 'after' };
//     //   const updatedTodo = await todoAppCollection.findOneAndUpdate(filter, updateDoc, options);
//     //   res.json(updatedTodo.value);
//     // });

//     app.put('/todoapp/:id', async (req, res) => {
//       try {
//         const id = req.params.id;
    
//         if (!ObjectId.isValid(id)) {
//           return res.status(400).json({ error: 'Invalid ObjectId' });
//         }
    
//         const filter = { _id: new ObjectId(id) };
//         const updateDoc = { $set: req.body };
//         console.log("updateDoc, ", updateDoc)
//         const options = { returnDocument: 'after' };
//         const updatedTodo = await todoAppCollection.findOneAndUpdate(filter, updateDoc, options);
        
//         res.json(updatedTodo.value);
//       } catch (error) {
//         console.error('Error updating todo:', error);
//         res.status(500).send('Internal Server Error');
//       }
//     });



//   }
//   finally{

//   }

// }
// run().catch(console.log)

// ///
// //  userName:userclasssix
// //password: xJRbcfu51v9KBKiW

// app.get('/',(req,res)=>{
//         res.send('running')
// })
// app.listen(port,()=>{
//         console.log(`running${port}`)
// })


//....................................................................
//https://fine-cyan-turtle-hem.cyclic.app/todoapp

const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fm710lc.mongodb.net/todoapp?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const todoAppCollection = client.db('todoapp').collection('dodoappdata');

    // Get all todo items
    app.get('/todoapp', async (req, res) => {
      const todos = await todoAppCollection.find({}).toArray();
      res.json(todos);
    });

    // Add a new todo item
    // app.post('/todoapp', async (req, res) => {
    //   const newTodo = req.body;
    //   const result = await todoAppCollection.insertOne(newTodo);
    //   res.json(result.ops[0]);
    // });

    app.post('/todoapp', async (req, res) => {
      try {
        const newTodo = req.body;
        const result = await todoAppCollection.insertOne(newTodo);
    
        if (result && result.ops && result.ops.length > 0) {
          res.json(result.ops[0]);
        } else {
          res.status(500).json({ error: 'Failed to insert todo.' });
        }
      } catch (error) {
        console.error('Error inserting todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    

//     app.post('/todoapp', async (req, res) => {
//     const user = req.body;
//     console.log("user",user);
//     const result = await appointmentOptionCollextion.insertOne(user);
//     res.send(result);
// });

    // Delete a todo item
    app.delete('/todoapp/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await todoAppCollection.deleteOne(filter);
      if (result.ops && result.ops.length > 0) {
        res.json(result.ops[0]);
      } else {
        // Handle the case where result.ops is undefined or empty
        // For example, you might send an error response or a default value.
        res.status(500).json({ error: 'No valid result.ops found.' });
      }
      // res.json({ deletedCount: result.deletedCount });
    });

    // Update a todo item
app.get("/todoapp/:id",async(req,res)=> {
  const id = req.params.id;
  const query = {_id: new  ObjectId(id)}
  const users = await  todoAppCollection.findOne(query)
  res.send(users)
})
// app.put("/todoapp/:id", async(req,res)=> {
//   const id = req.params.id;
//   const user= req.body;
//   console.log(user)
//   const filter =  {_id: new ObjectId(id)}
//   const options = {upsert: true}
//   const  updatauser = {
//     $set : {
//       name: user.name,
//       email: user.email,
//     }
//   }
// const resul = await todoAppCollection.updateOne(filter, options, updatauser)
// res.send(resul)
// })
app.put("/todoapp/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    console.log(user);
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        name: user.name,
        email: user.email,
      }
    };

    const result = await todoAppCollection.updateOne(filter, update);

    res.json({ success: true, message: 'Document updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

    // app.put('/todoapp/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = { $set: req.body };
    //   const options = { returnDocument: 'after' };
    //   const updatedTodo = await todoAppCollection.findOneAndUpdate(filter, updateDoc, options);
    //   res.json(updatedTodo.value);
    // });
  } finally {
    // Uncomment the following line if you want to close the MongoDB connection after running the CRUD operations
    // await client.close();
  }
}

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Run the server
run().catch(console.error);
