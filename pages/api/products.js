import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { MongoClient } from 'mongodb';


function setFileData(fileName, data) {
    const filePath = path.join(process.cwd(), 'data', fileName);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return true;
}
function getFileData(fileName) {
    const filePath = path.join(process.cwd(), 'data', fileName);
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}
export async function getDBClient() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.ESTORE_DBUSERNAME}:${process.env.ESTORE_DBPASSWORD}@cluster0.mi20r.mongodb.net/eStoreDB?retryWrites=true&w=majority`);
    return client;
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
async function deleteProduct(productId) {
    try {
        const client = await getDBClient();
        const db = client.db();
        await db.collection('products').deleteOne({ id: productId});
        client.close();
        return { "success": true, "error": null };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "error": `${e}` };
    }
}
async function getProducts() {
    try {
        const client = await getDBClient();
        const db = client.db();
        const data = await db.collection('products').find().toArray();
        client.close();
        return { "success": true, "error": null, data: data };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "error": `${e}` };
    }
}
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newProduct = {
            id: randomUUID(),
            name: req.body.name,
            mrp: req.body.mrp
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
        const dbResult = await getProducts();
        res.status(200).json(dbResult);
    }
}