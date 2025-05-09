// components/ImageUploader.tsx
"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("folder", "portfolio/Tecnologias"); // ejemplo: subcarpeta dentro de "portfolio"

    const res = await fetch("/api/images/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploadedUrl(data.url);
  };

  return (
    <div className="p-4 border rounded space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
          }
        }}
      />
      {preview && <img src={preview} alt="preview" className="w-40 h-40 object-cover" />}
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Subir imagen
      </button>
      {uploadedUrl && (
        <div>
          <p>Imagen subida:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
            Ver imagen en Cloudinary
          </a>
        </div>
      )}
    </div>
  );
}
