// import { type NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   return NextResponse.redirect(new URL("/about", req.url));
// }

import { auth } from "./app/_services/auth/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
