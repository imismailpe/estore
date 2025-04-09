import { deleteDocument, getAllDocuments, insertDocument } from "../functions";

export async function POST(req) {
  const body = await req.json();
  const { name } = body;
  const newData = {
    name,
  };
  const dbResult = await insertDocument("categories", newData);
  return Response.json(dbResult, {
    status: 201,
  });
}
export async function DELETE(req) {
  const body = await req.json();
  const { _id } = body;
  const dbResult = await deleteDocument("categories", _id);

  return Response.json(dbResult, {
    status: 200,
  });
}
export async function GET() {
  const sort = { name: 1 };
  const dbResult = await getAllDocuments("categories", sort);

  return Response.json(dbResult, {
    status: 200,
  });
}
