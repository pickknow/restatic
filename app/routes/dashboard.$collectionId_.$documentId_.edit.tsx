import type { ActionFunctionArgs, LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node";
import { Form, useNavigate, redirect, useLoaderData } from "@remix-run/react";
import { useEffect, } from "react";
import { useDocuments } from "@/libs/hooks/useDocuments";
import { titleToSlug } from '@/libs/handleFunctions'

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const {getDocumentBySlug} = useDocuments()
  const collectionId = params.collectionId;
  const slug = params.documentId;

  const document = slug !== '-'
    ? getDocumentBySlug(collectionId as string, slug as string)
    : null
  if (slug !== '-' && !document) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ document, slug, collectionId });
};


export const action = async ({ params, request }: ActionFunctionArgs) => {

  const {updateDocument, createDocument} = useDocuments()

  const formData = await request.formData();
  const collectionId = formData.get('collectionId');
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const description = formData.get('description') as string;
  const coverImage = formData.get('coverImage') as string;
  const newSlug = slug !== '' ? titleToSlug(slug) : titleToSlug(title);
  const data = {
    collection: formData.get('collectionId') as string,
    slug: newSlug,
    title,
    description,
    coverImage,
    status: formData.get('status') as string || 'draft',
    publishedAt: new Date().toISOString(),
  }
  const oldSlug = formData.get('oldSlug') as string;
  oldSlug === '-' ? createDocument(data, content) : updateDocument(data, content, oldSlug);
  return redirect(`/dashboard/${collectionId}`)
}

export default function EditContact() {
  const { document, slug, collectionId } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  useEffect(() => {

  }, [])


  // const MDXEditor = React.lazy(() => import("~/compontments/dashboard/Editor/TiptapMarkdown").then((mod) => ({
  //   default: mod.default,
  // })));
  // const SimpleMDEEditor = React.lazy(() => import("~/compontments/dashboard/Editor/SimpleMDEEditor").then((mod) => ({
  //   default: mod.default,
  // })));
  return (
    <Form className="flex w-full flex-row h-full gap-8" key={document?.title} id="contact-form" navigate={false} method="post">
      <div className="flex flex-col gap-8  h-full w-full">
        <div className="flex">
          <div className="w-28">title</div>
          <input
            aria-label="title"
            defaultValue={document?.title}
            name="title"
            placeholder="title"
            type="text"
            className="input"
          />
        </div>
        <div className="flex">
          <div className="w-28">slug</div>
          <input
            aria-label="slug"
            defaultValue={document?.slug}
            name="slug"
            placeholder="slug"
            type="text"
            className="input"
          />
        </div>
        <div className="flex">
          <div className="w-28">cover</div>
          <input
            aria-label="coverImage"
            defaultValue={document?.coverImage}
            name="coverImage"
            placeholder="coverImage"
            type="text"
            className="input"
          />
        </div>
        <div className="flex">
          <div className="w-28">status</div>
          <select name="status" defaultValue={document?.status === 'draft' ? 'draft' : 'published'} className="select">
            <option disabled={true}>Pick one</option>
            <option value="draft" >draft</option>
            <option value="published" >published</option>
          </select>
        </div>
        <div className="flex ">
          <div className="w-28">description</div>
          <textarea name="description" defaultValue={document?.description} className="textarea textarea-xl text-base w-full"></textarea>
        </div>
        {/* {isClient && <ClientOnly fallback={<p>Loading...</p>}>
          {() => <CodeMirrorMarkdownEditor content={content} setContent={setContent} />}
        </ClientOnly>} */}
        {/* <div className="flex "> */}
        {/* <div className="w-28">content</div> </div> */}

        {/* <Suspense fallback={<div>Loading editor...</div>}>
          <MDXEditor />
        </Suspense> */}
        <div className="flex ">
          <div className="w-28">content</div>
          <textarea name="content" defaultValue={document?.content} className="textarea text-base textarea-xl w-full min-h-[400px]"></textarea>
        </div>
        <div className="gap-8 flex">
          <div className="w-28"></div>
          <div className="gap-8 flex">
            <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)} type="button">Cancel</button>
          </div>
        </div>
      <input type="hidden" name="collectionId" value={collectionId} />
      <input type="hidden" name="oldSlug" value={slug} />
      </div>

    </Form>
  );
}
