import {
  Form,
  Link,
} from "@remix-run/react";

import { useFetcher } from "@remix-run/react";
import { typeCollection } from "~/types/public";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlinePoweroff } from "react-icons/ai";
export default function DashboardLeft({ collections }: { collections: typeCollection[] }) {
  const fetcher = useFetcher();
  return (
    <div className="flex flex-col w-[300px] p-2 pt-5 bg-gray-300  h-full justify-between">

      <div className="flex flex-col">
      <Link className="btn mb-10" to={`/dashboard/`}>Dashboard</Link>
        <div className="flex flex-col mt-5">
          {collections.map((item, index) =>
            <Link key={index} to={`/dashboard/${item.title}`} 
            className="w-full mb-2 bg-[#f1f1f1] hover:bg-white hover:text-black p-2 rounded-md gap-2">
              {item.slug}
            </Link>
          )}
        </div>
      </div>
      <div className="gap-8 flex flex-col">
        <div className="flex flex-col mt-5 gap-8">
          <fetcher.Form action="/dashboard" className="flex" method="post">
            <input
              className="input"
              aria-label="collection"
              placeholder="collection name"
              type="text"
              name="collection"
            />
            <button type="submit" className="btn btn-primary">New</button>
            <input type="hidden" name='isNew' value={'new'} />
          </fetcher.Form>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-4">
          </div>
          <Form
            action={`/dashboard/setting/reinit`}
            method="post"
            navigate={false}
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to reset this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <div className="flex gap-8">
            <Link to={`/dashboard/setting`} className="btn"><AiOutlineSetting /></Link>
            <Link to={`/dashboard/logout`} className="btn"><AiOutlinePoweroff /></Link>
            <button type="submit" className="btn">Re-Set</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
