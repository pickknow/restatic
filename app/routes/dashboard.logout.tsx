import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, Link,useLoaderData,useNavigate } from "@remix-run/react";
import { getSession, destroySession,commitSession } from "@/libs/sessions"

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  if (!session.id) {
    console.log("No session ID, nothing to destroy");
    return redirect("/");
  }
  const cookieHeader = await destroySession(session);
  console.log("Session ID to destroy:", session.id);
  return redirect("/", {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
};


export default function LogoutRoute() {
  return (
    <div className="flex flex-col">
      <p>Are you sure you want to log out?</p>
      <Form method="post">
        <button type="submit" className="btn btn-primary">Logout</button>
      </Form>
    </div>
  );
}
