const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express()
const port = 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b7kaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('connected database')
        const database = client.db('car-machanic');
        const serviceCollection = database.collection('services')

        // post api
        app.post('/services',async(req,res)=>{
            const service = {
                "name":"engineer",
                "price":"500",
                "description":"ajhgfjafg"

            }
            const result = await serviceCollection.insertOne(service)
            console.log(result)
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