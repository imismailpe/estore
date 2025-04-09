import { MongoClient, ObjectId } from 'mongodb';

let cachedClient = null;

export async function getDBClient() {
    if(cachedClient){
        return cachedClient
    }
    const client = await MongoClient.connect(`mongodb+srv://${process.env.ESTORE_DBUSERNAME}:${process.env.ESTORE_DBPASSWORD}@cluster0.mi20r.mongodb.net/eStoreDB?retryWrites=true&w=majority`);
    cachedClient = client;
    return client;
}
export async function getAllDocuments(collection, sort, filter = {}) {
    try {
        const client = await getDBClient();
        const db = client.db();
        const documents = await db.collection(collection).find(filter).sort(sort).toArray();
        return { "success": true, data: documents };
    }
    catch (e) {
        console.log("error in getAllDocuments", e);
        return { "success": false, "message": `${e}` };
    }
}
export async function getDocumentUsingId(collection, id, sort) {
    try {
        const client = await getDBClient();
        const db = client.db();
        const docId = new ObjectId(id);
        const documents = await db.collection(collection).find({ _id: docId }).sort(sort).toArray();
        return { "success": true, data: documents };
    }
    catch (e) {
        console.log("error in getDocumentUsingId", e);
        return { "success": false, "message": `${e}` };
    }
}
export async function insertDocument(collection, data) {
    try {
        const client = await getDBClient();
        const db = client.db();
        const result = await db.collection(collection).insertOne(data);
        return { "success": result.acknowledged, "message": "Added successfully"  };
    }
    catch (e) {
        console.log("error in insertDocument", e);
        return { "success": false, "message": `${e}`};
    }
}
export async function deleteDocument(collection, id) {
    try {
        const client = await getDBClient();
        const db = client.db();
        const docId = new ObjectId(id);
        const result = await db.collection(collection).deleteOne({ _id: docId });
        return { "success": result.acknowledged, "message": `${result.deletedCount} document(s) deleted successfully` };
    }
    catch (e) {
        console.log("error in deleteDocument", e);
        return { "success": false, "message": `${e}` };
    }
}
export async function updateDocument(collection, id, data) {
    try {
        const client = await getDBClient();
        const db = client.db();
        const docId = new ObjectId(id);
        const result = await db.collection(collection).updateOne(
            { _id: docId },
            { $set: data }
        );
        return { "success": result.acknowledged, "message": `Updated ${result.modifiedCount} document(s)` };
    }
    catch (e) {
        console.log("error in updateDocument", e);
        return { "success": false, "message": `${e}` };
    }
};
export async function upsertDocument(collection, data){
    try{
        const client = await getDBClient();
        const db = client.db();
        const query = { email: data.email };
        const options = { upsert: true };
        const update = { $set: { ...data }};
        const result = await db.collection(collection).updateOne(query, update, options);
        return { "success": result.acknowledged, "message": "Added successfully"  };
    } catch(e){
        console.log("error in upsertDocument", e);
        return { "success": false, "message": `${e}`};
    }
};
export async function getUserByEmail(email){
    try {
        const client = await getDBClient();
        const db = client.db();
        const documents = await db.collection("users").find({ email: email }).toArray();
        return { "success": true, data: documents };
    }
    catch (e) {
        console.log("error in getUserByEmail", e);
        return { "success": false, "message": `${e}` };
    }
}