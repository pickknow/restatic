import type { ActionFunctionArgs, LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node";
import { Form, useNavigate, useLoaderData } from "@remix-run/react";

import { useSettings } from "@/libs/hooks/useSettings";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const { getSettings } = useSettings()
  const settings = getSettings();
  return json({ settings });
};

const fields = [
  { 'key': 'webSiteName', 'desc': 'webSiteName' },
  { 'key': 'email', 'desc': 'Email' },
  { 'key': 'avatar', 'desc': 'avatar' },
  { 'key': 'title', 'desc': 'title for seo' },
  { 'key': 'description', 'desc': 'description for seo' },
]
const areaFields = [
  { 'key': 'indexTop', 'desc': 'indexTop' },
  { 'key': 'indexBottom', 'desc': 'indexBottom' },
]

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { setSettings } = useSettings()
  const formData = await request.formData();
  let data = {}
  fields.concat(areaFields).forEach(field => {
    data[field.key] = formData.get(field.key) as string
  })
  setSettings(data)
  return json({ ok: true });
}

export default function EditContact() {
  const { settings } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Form className="flex w-full h-full flex-col gap-8" id="contact-form" navigate={false} method="post">
        {fields.map((field, index) => (
          <div className="flex" key={index}>
            <div className="w-28">{field.key}</div>
            <input
              aria-label={field.desc}
              defaultValue={settings[field.key]}
              name={field.key}
              placeholder={field.desc}
              type="text"
              className="input"
            />
          </div>
        ))}
        {areaFields.map((field, index) => (
          <div className="flex" key={index}>
            <div className="w-28">{field.key}</div>
            <textarea 
            name={field.key}
            defaultValue={settings[field.key]} 
            className="textarea textarea-xl text-base w-full min-h-48"></textarea>
          </div>
        ))}

        <div className="gap-8 flex flex-row">
          <button className="btn btn-primary" type="submit">Save</button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)} type="button">Cancel</button>
        </div>
    </Form>
  );
}
