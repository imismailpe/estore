import path from 'path';
import fs from 'fs';

// function setFileData(fileName, data){
//     const filePath = path.join(process.cwd(), 'data', fileName);
//     fs.writeFileSync(filePath, JSON.stringify(data));
//     return true;
// }
function getFileData(fileName){
    const filePath = path.join(process.cwd(), 'data', fileName);
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}
export default function handler(req, res){
    // if(req.method === 'POST'){
    //     const newProduct = {
    //         id: randomUUID(),
    //         name: req.body.name,
    //         mrp: req.body.mrp
    //     }
    //     let data = getFileData(fileName);
    //     data.push(newProduct);    
    //     const writeData = setFileData('products.json', data);
    //     res.status(201).json({ success: writeData, error: null});
    // }
    // else if(req.method === 'DELETE'){
    //     const data = getFileData('products.json');
    //     const productToDelete = req.body.id;
    //     const dataAfterDelete = data.filter(product => product.id !== productToDelete);
    //     const writeData = setFileData('products.json', dataAfterDelete);
    //     res.status(201).json({ success: writeData, error: null});
    // }
    // else{
        const data = getFileData('categories.json');
        res.status(200).json({ data: data, error: null});
    // }
}