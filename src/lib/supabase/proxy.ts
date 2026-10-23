import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
 
export async function updateSession(
request: NextRequest
) {
let response = NextResponse.next({
request,
});
 
const supabaseUrl =
process.env.NEXT_PUBLIC_SUPABASE_URL;
 
const supabaseKey =
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 
if (!supabaseUrl || !supabaseKey) {
throw new Error(
"Supabase ortam değişkenleri bulunamadı."
);
}
 
const supabase = createServerClient(
supabaseUrl,
supabaseKey,
{
cookies: {
getAll() {
return request.cookies.getAll();
},
 
setAll(cookiesToSet) {
cookiesToSet.forEach(
({ name, value }) => {
request.cookies.set(name, value);
}
);
 
response = NextResponse.next({
request,
});
 
cookiesToSet.forEach(
({ name, value, options }) => {
response.cookies.set(
name,
value,
options
);
}
);
},
},
}
);
 
const { data } = await supabase.auth.getClaims();
 
const userId = data?.claims?.sub;
 
const pathname = request.nextUrl.pathname;
 
const isAuthPage =
pathname.startsWith("/login") ||
pathname.startsWith("/register");
 
const isProtectedPage =
pathname.startsWith("/dashboard") ||
pathname.startsWith("/calendar") ||
pathname.startsWith("/tasks") ||
pathname.startsWith("/habits") ||
pathname.startsWith("/sports") ||
pathname.startsWith("/nutrition") ||
pathname.startsWith("/courses") ||
pathname.startsWith("/work") ||
pathname.startsWith("/projects") ||
pathname.startsWith("/notes") ||
pathname.startsWith("/reports") ||
pathname.startsWith("/profile") ||
pathname.startsWith("/settings");
 
if (!userId && isProtectedPage) {
const url = request.nextUrl.clone();
 
url.pathname = "/login";
 
return NextResponse.redirect(url);
}
 
if (userId && isAuthPage) {
const url = request.nextUrl.clone();
 
url.pathname = "/dashboard";
 
return NextResponse.redirect(url);
}
 
return response;
}