// removes user from session and logs out
import { removeTokenCookie } from "../../lib/auth-cookies";

export default async function logout(req, res) {
  removeTokenCookie(res);
  res.writeHead(302, { Location: "/" });
  res.end();
}
