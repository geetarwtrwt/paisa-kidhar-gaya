import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export let validateToken = async () => {
  try {
    let token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token not found");
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error(err.message);
  }
};
