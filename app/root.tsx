import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import type { LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import type { LinksFunction } from "@remix-run/node";
import { TopNav, Footer } from '@/theme'
import appStylesHref from "./tailwind.css?url";
import { useSettings } from "@/libs/hooks/useSettings";
import { useCollections } from "./libs/hooks/useCollections";
import {useDb} from '~/libs/hooks/useDb'



export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const meta: MetaFunction = () => {
  return [
    { title: "ReStatic" },
    { name: "description", content: "A Remix Staic Cms!" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen m-0">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  console.error("Root ErrorBoundary caught:", error);
  return (
    <html>
      <head>
        <title>An error occurred!</title>
      </head>
      <body>
        <h1>Root level error!</h1>
        <pre>{JSON.stringify(error,null,2)}</pre>
      </body>
    </html>
  );
}

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const {getCollections} = useCollections()
  const collections = getCollections().filter(item=>!item.hidden && item.slug!=='pages')
  const {documentDB} = useDb()
  const db = await documentDB()
  const pages = await db.find({ collection: 'pages'}, [ 'title', 'slug', 'publishedAt', ]).toArray()
  const { getSettings } = useSettings()
  const settings = getSettings()
  return { collections, pages, settings };
}


export default function App() {
  const { collections, pages, settings } = useLoaderData<typeof loader>()

  return <div className="">
    <TopNav collections={collections} settings={settings} pages={pages} />
    <div className="min-h-[800px]">
    <Outlet />
    </div>
    <Footer settings={settings} />
  </div>
}
