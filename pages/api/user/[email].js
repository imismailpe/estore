import { getUserByEmail } from "../functions";

export default async function handler(req, res) {
    const dbResult = await getUserByEmail(req.query.email);
    res.status(200).json(dbResult);
}