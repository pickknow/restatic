import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { getSession, commitSession } from "@/libs/sessions"


export async function loader({
  request,
}: LoaderFunctionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({
  request,
}: ActionFunctionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password"); 
  console.log(username, password)

  const userId = username === process.env.USERNAME && password === process.env.PASSWORD
    ? username
    : null

  if (userId == null) {
    session.flash("error", "Invalid username/password");
    // Redirect back to the login page with errors.
    return redirect("/dashboard/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  // Login succeeded, send them to the home page.
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <div className="container m-auto justify-center items-center flex h-[800px] w-full flex-col">
      <div className="w-72 h-96">
        {error ? <div className="error">{error}</div> : null}
        <form method="POST" className="flex flex-col gap-4">
          <label className="input">
            <input name="username" className="grow" placeholder="username" />
          </label>
          <label className="input">
            <input type="password" name="password" className="grow" placeholder="password" />
          </label>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>

    </div>
  );
}
