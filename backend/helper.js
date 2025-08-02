import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export let validateToken = async () => {
  try {
    let token = cookies().get("token")?.value;
    if (!token) throw new Error("Token not found");
    let decoded = jwt.verify(token, "jwtsecretkey");
    return decoded;
  } catch (err) {
    throw new Error(err.message);
  }
};
