import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/builder(.*)",
  "/account(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Run for all routes except static files, _next assets, and public pages
    "/((?!_next|.*\\..*|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
