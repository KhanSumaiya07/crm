import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  if (!token && url.pathname.startsWith("/admin-dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (url.pathname.startsWith("/admin-dashboard") && decoded.role !== 'admin') {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } catch (err) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard"]
};