// app/api/images/edit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { replaceImageController } from "@/controllers/image.controller";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;
    const public_id = formData.get("public_id") as string;

    if (!file || !folder || !public_id) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const result = await replaceImageController(file, folder, public_id);
    return NextResponse.json(
      { url: result.secure_url, public_id: result.public_id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al editar imagen:", error);
    return NextResponse.json({ error: "Falló la edición de la imagen" }, { status: 500 });
  }
}
