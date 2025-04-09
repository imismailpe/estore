import { getDocumentUsingId } from "../../functions";

export async function GET(req, { params }) {
  const { productid } = await params;
  const sort = { name: -1 };
  const dbResult = await getDocumentUsingId("products", productid, sort);
  return Response.json(dbResult);
}
