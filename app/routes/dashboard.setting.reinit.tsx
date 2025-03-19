import type { ActionFunctionArgs, LoaderFunctionArgs, } from "@remix-run/node"; // or cloudflare/deno
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { useInitMds } from "@/libs/hooks/useInitMds";


export const action = async ({ params, request }: ActionFunctionArgs) => {
  const {reInit}  = useInitMds()
  try{
    reInit()
  }catch(e){
    console.error(e)
  }
  return redirect(`/dashboard`)
}
