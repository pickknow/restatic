import { Form } from "@remix-run/react"
import { extensions } from "@tiptap/core"

export type reDocument<
  TSchema extends { [key: string]: unknown } = { [key: string]: unknown }
> = TSchema & {
  content: string
  collection: string
  slug: string
  title: string
  status: string
  description?: string
  coverImage?: string
  publishedAt: string
  author?: {
    name?: string
    picture?: string
  }
}
// export type FormDocument = Partial<Pick<reDocument, 'content'>> & Omit<reDocument, 'content'>;
export type FormDocument = {
  collection: string
  slug: string
  title: string
  status: string
  description?: string
  coverImage?: string
  publishedAt: string
  author?: {
    name?: string
    picture?: string
  }
}
export type typeDocument = FormDocument


export type typeCollection = 
  {
    title: string
    slug: string
    hidden?: boolean
    path?: string
    chindren?:FormDocument[]
  }

export type typeSearchQuery = {
  [key:string] :string;
}
export type typeMetaFile = {
  metadata: FormDocument[]
}
