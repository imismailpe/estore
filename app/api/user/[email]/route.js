import { getUserByEmail } from "../../functions";

export async function GET(req, {params}){
    const { email } = await params;
    const dbResult = await getUserByEmail(email);
    return Response.json(dbResult);
}