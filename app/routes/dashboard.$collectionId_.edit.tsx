import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData,useNavigate } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import { useCollections } from "@/libs/hooks/useCollections";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const {getCollections} = useCollections()
  const _collection = getCollections();
  const collection = _collection.filter(item => item.slug == params.collectionId)[0]
  if (!collection) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ collection });
};


export const action = async ({ request }: ActionFunctionArgs) => {
  const {updateCollection} = useCollections()
  
  const formData = await request.formData();
  const oldCollection = formData.get('oldCollection') as string
  const title = formData.get('title') as string
  const hidden = formData.get('hidden')

  updateCollection(oldCollection, title, !!hidden)
  return redirect('/dashboard')
}


export default function EditContact() {
  const { collection } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="mt-10 gap-8 pt-8">

        <div className="flex flex-row gap-8 mb-10">
          <div>Slug:{collection.slug}[can be changed]</div>
        </div>
      <Form key={collection.title} className="items-center flex gap-8 flex-col" navigate={false} id="contact-form" method="post">
        <div className="flex flex-row gap-8">
          <div>Name</div>
          <input
            className="input"
            aria-label="title"
            defaultValue={collection.title}
            name="title"
            placeholder="title"
            type="text"
          />
        </div>
        <div className="flex flex-row gap-8">
          <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
            <legend className="fieldset-legend">hidden?</legend>
            <label className="fieldset-label">
              <input type="checkbox" defaultChecked={collection.hidden} name="hidden" className="toggle" />
              hidden
            </label>
          </fieldset>
        </div>


        <div className="gap-8 flex flex-row">
          <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)} type="button">Cancel</button>
        </div>
        <input type="hidden" name="oldCollection" value={collection.title} />
      </Form>
    </div>
  );
}
