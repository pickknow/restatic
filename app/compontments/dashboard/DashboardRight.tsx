import {
  Form,
} from "@remix-run/react";
import { typeCollection } from "~/types/public";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

export default function DashboardRight({ collections }: { collections: typeCollection[] }) {
  return (
    <div className="flex flex-row items-start gap-4 ">
      {collections.map((item, index) =>
        <div key={index} className="card w-96 bg-base-100 card-md shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <div>slug:{item.slug}</div>
            <div>hidden:{item.hidden ? 'true' : 'false'}</div>
            <div className="justify-end card-actions">
              <Form action={`/dashboard/${item.slug}/edit`}>
                <button type="submit" className="btn text-lg"><AiOutlineEdit /></button>
              </Form>
              <Form
                action={`/dashboard/${item.slug}/destory`}
                method="post"
                navigate={false}
                onSubmit={(event) => {
                  const response = confirm(
                    "Please confirm you want to delete this collection."
                  );
                  if (!response) {
                    event.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="slug" value={item.slug} />

                <button type="submit" className="btn text-lg"> <AiOutlineDelete /></button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
