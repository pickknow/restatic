import {
  useLoaderData,
} from "@remix-run/react";
import type { LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { DocumentDetail } from '@/theme/index'
import { useDocuments } from "@/libs/hooks/useDocuments";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  invariant(params.collectionId, "Missing collectionId param");
  invariant(params.documentId, "Missing documentId param");
  const {getDocumentBySlug} = useDocuments()
  const document = getDocumentBySlug(params.collectionId, params.documentId)
  if (!document) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ document});
}

export default function App() {
  const { document} = useLoaderData<typeof loader>()

  return (
    <DocumentDetail document={document} />
  )



}
