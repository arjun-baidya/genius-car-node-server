const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')
require('dotenv').config();
const app = express()
const port = 5000

// ?middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b7kaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('connected database')
        const database = client.db('car-machanic');
        const serviceCollection = database.collection('services')
        // get all data
        app.get('/services',async(req,res)=>{
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray();
            res.send(services);
        })
        // get single data
        app.get('/services/:id',async(req,res)=>{
            const id = req.params.id;
            console.log('id get')
            const query = {_id:ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.json(service);
        })
        // post api
        app.post('/services',async(req,res)=>{
            const service = req.body;
            console.log('hit the post api')
            const result = await serviceCollection.insertOne(service)
            console.log(result)
            res.json(result)
        })

        // delete
        app.delete('/services/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await serviceCollection.deleteOne(query)
            res.json(result);
        })
    }
    finally{
        // await client.close()
    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})