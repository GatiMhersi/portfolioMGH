import { cookies } from "next/headers";
import { verifyToken } from "./verifyToken";

export async function requireAuth() {
  const token = (await cookies()).get("token")?.value;

  const isValid = await verifyToken(token || "");
  if (!isValid) {
    throw new Error("Unauthorized");
  }
}
