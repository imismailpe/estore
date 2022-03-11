// import path from 'path';
// import fs from 'fs';

import { deleteDocument, getAllDocuments, insertDocument } from "../functions";


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
        const newData = {
            name: req.body.name,
        }
        const dbResult = await insertDocument('categories', newData);
        res.status(201).json(dbResult);
    }
    else if (req.method === 'DELETE') {
        const id = req.body._id;
        const dbResult = await deleteDocument('categories', id);
        res.status(201).json(dbResult);
    }
    else {
        const sort = { 'name': -1 };
        const dbResult = await getAllDocuments('categories', sort);
        res.status(200).json(dbResult);
    }
}