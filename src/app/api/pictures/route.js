import connectDB from "@/lib/connectDb.js";
import Picture from "@/lib/pictures.model.js";

export const GET = async () => {
  await connectDB();

  try {
    const pictures = await Picture.find({});
    return new Response(JSON.stringify(pictures));
  } catch (error) {
    return new Response("error");
  }
};
export const POST = async (request) => {
  await connectDB();

  const body = await request.json();

  const newPicture = new Picture({
    ...body,
    path: body.file,
  });
  await newPicture.save();
  return new Response(JSON.stringify(newPicture));
};
