import { getDocumentUsingId } from "../functions";

export default async function handler(req, res) {
    const sort = { 'name': -1 };
    const dbResult = await getDocumentUsingId('products', req.query.productid, sort);
    res.status(200).json(dbResult);
}