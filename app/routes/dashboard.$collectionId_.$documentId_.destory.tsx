import type { ActionFunctionArgs,} from "@remix-run/node"; // or cloudflare/deno
import { redirect,} from "@remix-run/react";

import { useDocuments } from "@/libs/hooks/useDocuments";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const {deleteDocument} = useDocuments()
  const formData = await request.formData();
  const collection = formData.get('collection') as string;
  const slug = formData.get('slug') as string;
  deleteDocument(collection, slug)

  return redirect(`/dashboard/${collection}`)
}
