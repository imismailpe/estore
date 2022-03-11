import { MongoClient, ObjectId } from 'mongodb';

export async function getDBClient() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.ESTORE_DBUSERNAME}:${process.env.ESTORE_DBPASSWORD}@cluster0.mi20r.mongodb.net/eStoreDB?retryWrites=true&w=majority`);
    return client;
}
export async function getAllDocuments(collection, sort, filter = {}) {
    try {
        const client = await getDBClient();
        const db = client.db();
        const documents = await db.collection(collection).find(filter).sort(sort).toArray();
        client.close();
        return { "success": true, data: documents };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "message": `${e}` };
    }
}
export async function getDocumentUsingId(collection, id, sort) {
    try {
        const client = await getDBClient();
        const db = client.db();
        const documents = await db.collection(collection).find({ _id: ObjectId(id) }).sort(sort).toArray();
        client.close();
        return { "success": true, data: documents };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "message": `${e}` };
    }
}
export async function insertDocument(collection, data) {
    try {
        const client = await getDBClient();
        const db = client.db();
        await db.collection(collection).insertOne(data);
        client.close();
        return { "success": true, "message": "Added successfully"  };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "message": `${e}`};
    }
}
export async function deleteDocument(collection, id) {
    try {
        const client = await getDBClient();
        const db = client.db();
        const result = await db.collection(collection).deleteOne({ _id: ObjectId(id) });
        client.close();
        return { "success": true, "message": `${result.deletedCount} document(s) deleted successfully` };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "message": `${e}` };
    }
}
export async function updateDocument(collection, id, data) {
    try {
        const client = await getDBClient();
        const db = client.db();
        const result = await db.collection(collection).updateOne(
            { _id: ObjectId(id) },
            { $set: data }
        );
        client.close();
        return { "success": true, "message": `Updated ${result.modifiedCount} document(s)` };
    }
    catch (e) {
        console.log("error connecting db", e);
        return { "success": false, "message": `${e}` };
    }
}