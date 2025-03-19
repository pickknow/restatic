
import {
  Outlet,
  useLoaderData
} from "@remix-run/react";
import { getPathAndQuery } from "@/libs/handleFunctions"
import type { ActionFunctionArgs, LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { getSession, commitSession } from "@/libs/sessions";

import DashboardLeft from "@/compontments/dashboard/DashboardLeft";
import { useCollections } from "@/libs/hooks/useCollections";

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const { getCollections } = useCollections()
  const collections = getCollections()

  if (process.env.NODE_ENV === "production") {
    const { pathname } = getPathAndQuery(request.url);
    const session = await getSession( request.headers.get("Cookie"));
    if (!session.has("userId") && !(pathname in ["/dashboard/login"])) {
      return redirect("/dashboard/login");
    }
    const data = { collections, error: session.get("error") };
    return json(data, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  return json({ collections})
}



export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const collection = formData.get('collection')
  const { AddCollection } = useCollections()
  collection && AddCollection(collection as string)
  return json({ ok: true });
}

export default function App() {
  const { collections } = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-row gap-8 h-screen bg-[#f1f1f1]">
      <DashboardLeft collections={collections} />
      <div className="p-8 flex w-full h-full">
        <Outlet />
      </div>
    </div>)
}
