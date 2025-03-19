import {
  createCookie,
  createFileSessionStorage,
} from "@remix-run/node"; // or cloudflare/deno

import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  secrets: ["s3cret"],
  path: "/", 
  httpOnly: true,
});

const { getSession, commitSession, destroySession } =
  createFileSessionStorage({
    // The root directory where you want to store the files.
    // Make sure it's writable!
    dir: "data/sessions",
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };

export async function requireUserId(request, redirectTo = "/login") {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) {
    throw redirect(redirectTo, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  return userId;
}

export async function createUserSession({ request, userId, redirectTo }) {
  const session = await getSession(request);
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
