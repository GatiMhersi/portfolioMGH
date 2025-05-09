// app/api/images/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { uploadImageController } from "@/controllers/image.controller";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    if (!file || !folder) {
      return NextResponse.json({ error: "No file or folder uploaded" }, { status: 400 });
    }

    const result = await uploadImageController(file, folder);
    return NextResponse.json({ url: result.secure_url, public_id: result.public_id }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
