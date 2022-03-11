// import path from 'path';
// import fs from 'fs';
import { MongoClient } from 'mongodb';


// function setFileData(fileName, data) {
//     const filePath = path.join(process.cwd(), 'data', fileName);
//     fs.writeFileSync(filePath, JSON.stringify(data));
//     return true;
// }
// function getFileData(fileName) {
//     const filePath = path.join(process.cwd(), 'data', fileName);
//     const fileData = fs.readFileSync(filePath);
//     const data = JSON.parse(fileData);
//     return data;
// }
export async function getDBClient() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.ESTORE_DBUSERNAME}:${process.env.ESTORE_DBPASSWORD}@cluster0.mi20r.mongodb.net/eStoreDB?retryWrites=true&w=majority`);
    return client;
}
export async function getAllDocuments(collection, sort, filter = {}){
    try{
        const client = await getDBClient();
        const db = client.db();
        const documents = await db.collection(collection).find(filter).sort(sort).toArray();
        client.close();
        return { "success": true, "error": null, data: documents };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "error": `${e}` };
    }
}
async function addProduct(product) {
    try {
        const client = await getDBClient();
        const db = client.db();
        await db.collection('products').insertOne(product);
        client.close();
        return { "success": true, "error": null };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "error": `${e}` };
    }
}
async function deleteProduct(id) {
    try {
        const client = await getDBClient();
        const db = client.db();
        await db.collection('products').deleteOne({ _id: id});
        client.close();
        return { "success": true, "error": null };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "error": `${e}` };
    }
}
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newProduct = {
            name: req.body.name,
            cost: req.body.cost,
            sellingPrice: req.body.sellingPrice,
            mrp: req.body.mrp,
            quantity: req.body.quantity
        }
        const dbResult = await addProduct(newProduct);
        res.status(201).json(dbResult);
    }
    if (req.method === 'PUT') {
        const newProduct = {
            name: req.body.name,
            cost: req.body.cost,
            sellingPrice: req.body.sellingPrice,
            mrp: req.body.mrp,
            quantity: req.body.quantity
        }
        const dbResult = await addProduct(newProduct);
        res.status(201).json(dbResult);
    }
    else if (req.method === 'DELETE') {
        const productToDelete = req.body.id;
        const dbResult = await deleteProduct(productToDelete); 
        res.status(201).json(dbResult);
    }
    else {
        const sort = { 'name' : -1};
        const filter = req.query.productId ? { '_id': req.query.productId} : {};
        const dbResult = await getAllDocuments('products', sort, filter);
        res.status(200).json(dbResult);
    }
}