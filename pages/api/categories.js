import { getDBClient } from "./products";

async function addCategory(category) {
    try {
        const client = await getDBClient();
        const db = client.db();
        await db.collection('categories').insertOne(category);
        client.close();
        return { "success": true, "error": null };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "error": `${e}` };
    }
}
async function deleteCategory(id) {
    try {
        const client = await getDBClient();
        const db = client.db();
        await db.collection('categories').deleteOne({ _id: id});
        client.close();
        return { "success": true, "error": null };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "error": `${e}` };
    }
}
async function getCategories() {
    try {
        const client = await getDBClient();
        const db = client.db();
        const data = await db.collection('categories').find().toArray();
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
        const newCategory = {
            name: req.body.name,
        }
        const dbResult = await addCategory(newCategory);
        res.status(201).json(dbResult);
    }
    else if (req.method === 'DELETE') {
        const categoryToDelete = req.body.id;
        const dbResult = await deleteCategory(categoryToDelete); 
        res.status(201).json(dbResult);
    }
    else {
        const dbResult = await getCategories();
        res.status(200).json(dbResult);
    }
}