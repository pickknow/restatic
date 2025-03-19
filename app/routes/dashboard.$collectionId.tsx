import type { FunctionComponent } from "react";
import { json, ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Form, Link, useLoaderData, } from "@remix-run/react";
import { useDocuments } from "@/libs/hooks/useDocuments";


import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.collectionId, "Missing collectionId param");
  const {getDocuments} = useDocuments()

  const documents = getDocuments(params.collectionId)

  return json({ documents, collectionId: params.collectionId });
};

export default function Contact() {
  const { documents, collectionId } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row-reverse">
        <Form action={`/dashboard/${collectionId}/-/edit`}>
          <button type="submit" className="btn btn-primary">New Article</button>
        </Form>
      </div>
      <div className="flex flex-col mt-8 w-full">
        <ul className="list bg-base-100 w-full rounded-box shadow-md">
          {documents.map((document, index) =>
            <li className="list-row" key={index}>
              <div>
                <Link to={`/dashboard/${collectionId}/${document.slug}/edit`}>
                  <span className="text-lg font-semibold">{document.title}</span>
                  <p className="text-xs uppercase font-semibold opacity-60">{document.status}</p>
                </Link>
              </div>
              <div>
              </div>
              <Link  className="btn text-lg" to={`/dashboard/${collectionId}/${document.slug}/edit`}>
              <AiOutlineEdit />
                </Link>
                {/* <button type="submit" className="btn text-lg"><AiOutlineEdit /></button> */}
              {/* <button className="btn  btn-primary"> Edit </button> */}
              <Form
                action={`/dashboard/${collectionId}/${document.slug}/destory`}
                method="post"
                onSubmit={(event) => {
                  const response = confirm(
                    "Please confirm you want to delete this record."
                  );
                  if (!response) {
                    event.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="collection" value={document.collection} />
                <input type="hidden" name="slug" value={document.slug} />
                <button type="submit" className="btn text-lg"> <AiOutlineDelete /></button>
              </Form>
            </li>
          )}
        </ul>
      </div>

    </div>
  );
}
