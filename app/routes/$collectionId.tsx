import {
  useLoaderData,
} from "@remix-run/react";
import type { LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import { useDb } from '@/libs/hooks/useDb'
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { FormDocument } from '@/types/public'
import { Documents, PageDetail } from '@/theme/index'

export async function loader({
  params,
}: LoaderFunctionArgs) {
  invariant(params.collectionId, "Missing collectionId param");
  const defaultImg = process.env.DEFAULT_IMG || 'https://i.ibb.co/TxBRxrWX/image-15.png'
  const { documentDB } = useDb()
  const db = await documentDB()
  const page = await db.find({ collection: 'pages', slug: params.collectionId }, [
    'title', 'slug', 'coverImage', 'description', 'state', 'publishedAt', 'content'
  ]).first()
  if (page) {
    return json({ page, documents: null, collectionId: params.collectionId,defaultImg   })
  }

  const documents: FormDocument[] = await db.find({ collection: params.collectionId },
    ['title', 'slug', 'coverImage', 'description', 'state', 'publishedAt']).toArray()

  return json({ documents, page: null, collectionId: params.collectionId, defaultImg  })

}

export default function App() {
  const { documents, page, collectionId, defaultImg} = useLoaderData<typeof loader>()
  return (<>
    {page ? <PageDetail document={page} />
      : documents && (<Documents documents={documents} collectionId={collectionId} defaultImg={defaultImg} />)}
  </>
  )


}
