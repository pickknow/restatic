
import {
  useLoaderData
} from "@remix-run/react";
import type {  LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import DashboardRight from "~/compontments/dashboard/DashboardRight";
import { json, } from "@remix-run/node"; // or cloudflare/deno
import { useCollections } from "@/libs/hooks/useCollections";

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const {getCollections} = useCollections()

  const collections = getCollections()
  return json({ collections});
}
export default function Index() {
  const {collections} = useLoaderData<typeof loader>()
  return (
      <DashboardRight collections={collections} />
  )
}
