const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://atifsupermart202199:FGzi4j6kRnYTIyP9@cluster0.bfulggv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try{
      await client.connect();
      console.log('db connected');
      const productCollection = client.db('atifdatamax').collection('product');
      const productsCollection = client.db('atifdatamax').collection('products');
      const brandCollection = client.db('atifdatamax').collection('brand');
      const supplierCollection = client.db('atifdatamax').collection('supplier');
      const groupCollection = client.db('atifdatamax').collection('group');
      const ssrCollection = client.db('atifdatamax').collection('ssr');
      const shopCollection = client.db('atifdatamax').collection('shop');
   
    //     api making 
    //     product display


    app.get('/product',  async(req, res) =>{
        const query = {};
        const cursor = productCollection.find(query);
        const product = await cursor.toArray();
        res.send(product);
        });
    app.get('/products',  async(req, res) =>{
        const query = {};
        const cursor = productsCollection.find(query);
        const produ = await cursor.toArray();
        res.send(produ);
        });
    app.get('/group',  async(req, res) =>{
        const query = {};
        const cursor = groupCollection.find(query);
        const product = await cursor.toArray();
        res.send(product);
        });
    app.get('/brand',  async(req, res) =>{
        const query = {};
        const cursor = brandCollection.find(query);
        const product = await cursor.toArray();
        res.send(product);
        });
    app.get('/supplier',  async(req, res) =>{
        const query = {};
        const cursor = supplierCollection.find(query);
        const product = await cursor.toArray();
        res.send(product);
        });
    app.get('/ssr',  async(req, res) =>{
        const query = {};
        const cursor = ssrCollection.find(query);
        const ssr = await cursor.toArray();
        res.send(ssr);
        });
    app.get('/shop',  async(req, res) =>{
        const query = {};
        const cursor = shopCollection.find(query);
        const shop = await cursor.toArray();
        res.send(shop);
        });

       // get damage speacific product
    app.get('/damage-stock-update/:id',   async(req, res) =>{
        const id = req.params.id;
        console.log(id);
        const querys = {};
        const cursor =  productsCollection.find(querys);
        const produ = await cursor.toArray();
        const getSerarchProduct = produ.find((p) => p.BarCode == id);
        res.send(getSerarchProduct);
       })


    // get with speacific product stock
    app.get('/products/:id',   async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const booking = await productsCollection.findOne(query);
        res.send(booking);
       })

       app.put('/handleAddToDamage/:id', async(req, res) =>{
        const id = req.params.id;
        console.log(id);
        const updatedStock = req.body;
        console.log(updatedStock);
        const filter = {_id: ObjectId(id)};
        const options = { upsert: true };
        const updatedDoc = {
            $set: {
                Damage_Quntity: updatedStock.reStock
            }
        };
        const result = await productsCollection.updateOne(filter, updatedDoc, options);
        res.send(result);
       })



       // .....object data ........................................................................................................
       const productdata = {
        "_id": "633f4e807784639f332e3b62",
        "Supplier_Name": "EGG",
        "BarCode": 111111,
        "Group": "MILK & DAIRY PRODUCTS",
        "Product": "EGG",
        "Brand": "EGG",
        "Style": "BROWN EGG 1PCS",
        "Stock_Qty": 0,
        "StockQty": 124,
        "CPU": 11.19,
        "CPU_Value": 0,
        "RPU": 12,
        "RPU_Value": 0,
        "Damage_Quntity": 0,
        "Comment": 0,
        "Status": "active"
        };

       
    // add brand 
    
        app.post('/brand', async(req, res) =>{
            const newBrand = req.body;
            console.log('adding new brand', newBrand);
            const result = await brandCollection.insertOne(newBrand);
            res.send(result)
          });
    // add supplier 
        app.post('/supplier', async(req, res) =>{
            const newSSR = req.body;
            console.log('adding new supplier', newSSR);
            const result = await supplierCollection.insertOne(newSSR);
            res.send(result)
          });
    // add ssr 
        app.post('/ssr', async(req, res) =>{
            const newSSR = req.body;
            console.log('adding new supplier', newSSR);
            const result = await ssrCollection.insertOne(newSSR);
            res.send(result)
          });
    // add ssr 
        app.post('/shop', async(req, res) =>{
            const newshop = req.body;
            console.log('adding new supplier', newshop);
            const result = await shopCollection.insertOne(newshop);
            res.send(result)
          });

        //   search api
        const rolll = {
          "_id": "633f4e807784639f332e3afc",
          "Supplier_Name": "DANISH FOOD LTD.",
          "BarCode": 8941152000307,
          "Group": "SNAKS & COOKIES",
          "Product": "BISCUIT",
          "Brand": "DANISH",
          "Style": "DOREO 4 PACK",
          "Stock_Qty": 0,
          "StockQty": 6,
          "CPU": 88,
          "CPU_Value": 0,
          "RPU": 110,
          "RPU_Value": 0,
          "Damage_Quntity": 9,
          "Comment": 0,
          "Status": "active"
          };

        //   app.get('/search/:text', async (req , res ) =>{
        //       let q = req.params; 
        //       console.log(q);
        //      let result =  await productsCollection.find({
        //        "$or":[
                
        //          {
        //           Group: {$regex: req.params.target}
        //          },
        //          {
        //           Product: {$regex: req.params.target}
        //          },
        //          { 
        //           Brand: {$regex: req.params.target}
        //          },
        //          {
        //           Style: {$regex: req.params.target}
        //          },
        //          {
        //           BarCode: {$regex: req.params.target}
        //          }
        //         //  },
        //         //  {
        //         //     Supplier_Name: {$regex: req.params.target}
        //         //   }
        //        ]
        //      });
        //      let rest = await result.toArray();
        //      // console.log(rest);
        //      res.send(rest);
     
        //  });
         
    app.get('/search/:target', async (req , res ) =>{
      let q = req.params;
      console.log(q);
       let result =  await productsCollection.find({
         "$or":[
          
           {
             Group: {$regex: req.params.target}
           },
           {
             Product: {$regex: req.params.target}
           },
           {
             Brand: {$regex: req.params.target}
           },
           {
             Style: {$regex: req.params.target}
           },
           {
             BarCode: {$regex: req.params.target}
           },
         ]
       });
       let rest = await result.toArray();
       // console.log(rest);
       res.send(rest);
   });
// deleting item
    app.delete('/brand/:id',   async(req, res) =>{
         const id = req.params.id;
         console.log("brand", id);
         console.log(ObjectId(id), 'object id');
         const query = {_id: ObjectId(id)};
         console.log(query, 'quary');
         const result = await brandCollection.deleteOne(query);
         res.send(result);
        })



  
    }
    finally{

    }
    
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send(`<h1 style="text-align: center;
      color: red;"> Server is Running at <span style="color: Blue;">${port}</span></h1>`);
  });

app.listen(port, () => {
  console.log("Atif super  mart server running at  : ", port);
});