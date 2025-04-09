import {
  deleteDocument,
  getAllDocuments,
  insertDocument,
  updateDocument,
} from "../functions";

export async function POST(req) {
  const body = await req.json();
  const { name, category, options } = body;
  const newProduct = {
    name,
    category,
    options,
  };
  const dbResult = await insertDocument("products", newProduct);
  return new Response(dbResult, {
    status: 201,
  });
}
export async function PUT(req) {
  const body = await req.json();
  const { name, category, options } = body;
  const updatedProduct = {
    name,
    category,
    options,
  };
  const dbResult = await updateDocument(
    "products",
    req.body._id,
    updatedProduct
  );

  return new Response(dbResult, {
    status: 201,
  });
}
export async function DELETE(req) {
  const body = await req.json();
  const { _id } = body;
  const dbResult = await deleteDocument("products", _id);

  return Response.json(dbResult, {
    status: 200,
  });
}
export async function GET() {
  const sort = { name: -1 };
  const dbResult = await getAllDocuments("products", sort);

  return Response.json(dbResult, {
    status: 200,
  });
}
