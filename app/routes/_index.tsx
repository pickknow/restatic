import type { MetaFunction } from "@remix-run/node";
import type { LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import { IndexHome } from "@/theme";


import { json,} from "@remix-run/node"; // or cloudflare/deno
import { useIndexPage } from "@/libs/hooks/useIndexPage";
import { useLoaderData } from "@remix-run/react";
import config from "@/configs.json";


export const meta: MetaFunction = () => {
  return [
    { title: config?.title || ''},
    { name: "description", content:config?.description || ''},
  ];
};


export async function loader({
  request,
}: LoaderFunctionArgs) {
  const {getTopContent, getEndContent, getCollections} = useIndexPage()
  const collections = await getCollections()
  const topContent = await getTopContent()
  const endContent = await getEndContent()
  const defaultImg = process.env.DEFAULT_IMG || 'https://i.ibb.co/bMcvCc3D/image-11.png'
  return json({collections, topContent, endContent, defaultImg })
}




export default function Index() {
  const {collections, topContent, endContent, defaultImg } = useLoaderData<typeof loader>()
  return (
    <div className="flex  sm:container sm:mx-auto flex-col items-center justify-center">
    <IndexHome collections={collections} topContent={topContent} endContent={endContent}defaultImg={defaultImg} /> 
    </div>
  );
}
