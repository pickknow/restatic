import type { ActionFunctionArgs, LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/react";

import { useCollections} from '@/libs/hooks/useCollections'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { deleteCollection } = useCollections()
  const formData = await request.formData();
  const slug = formData.get('slug') as string;
  deleteCollection(slug)
  return redirect(`/dashboard`)
}
