// import path from 'path';
// import fs from 'fs';

import { deleteDocument, getAllDocuments, insertDocument, updateDocument } from "../functions";


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



export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newProduct = {
            name: req.body.name,
            category: req.body.category,
            options: req.body.options
        }
        const dbResult = await insertDocument('products', newProduct);
        res.status(201).json(dbResult);
    }
    if (req.method === 'PUT') {
        const updatedProduct = {
            name: req.body.name,
            category: req.body.category,
            options: req.body.options
        }
        const dbResult = await updateDocument('products', req.body._id, updatedProduct);
        res.status(201).json(dbResult);
    }
    else if (req.method === 'DELETE') {
        const id = req.body._id;
        const dbResult = await deleteDocument('products', id);
        res.status(201).json(dbResult);
    }
    else {
        const sort = { 'name': -1 };
        const dbResult = await getAllDocuments('products', sort);
        res.status(200).json(dbResult);
    }
}