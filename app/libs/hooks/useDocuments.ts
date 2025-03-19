import fs, { read } from 'fs'
import { reDocument, typeCollection, FormDocument, typeMetaFile } from '~/types/public'
import { join } from 'path'
import { useFilePaths } from './useFilePaths'
import { initCollection } from '@/types/initSchemes'
import { useMetadatas } from './useMetadatas'
import matter from 'gray-matter'


export const useDocuments = () => {
  const { CONTENT_PATH, collectionFile } = useFilePaths()
  const { getMetadata } = useMetadatas()



  const getDocuments = (collection: string | null = null): FormDocument[] => {
    const data = getMetadata()
    return collection
      ? data.filter((item: FormDocument) => item.collection === collection)
      : data
  }

  const getSchema = (collection: string): typeof initCollection | null => {
    const collectionsPath = join(CONTENT_PATH, collection)
    const filePath = join(CONTENT_PATH, collection, 'schema.json')
    if (!fs.existsSync(filePath)) {
      const data = initCollection
      if (!fs.existsSync(collectionsPath)) {
        fs.mkdirSync(collectionsPath)
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    }
    try {
      const jsonData = fs.readFileSync(filePath, 'utf8'); // Read file synchronously
      return JSON.parse(jsonData); // Parse JSON string to JavaScri
    } catch (error) {
      console.error(`getCollectionSchema :${collection}`, error)
      return null
    }
  }
  const getDocumentBySlug = (collection: string, slug: string): reDocument | null => {
    const collectionsPath = join(CONTENT_PATH, collection)
    const mdPath = join(collectionsPath, `${slug}.md`)
    const mdxPath = join(collectionsPath, `${slug}.mdx`)

    let fullPath: string

    // Check which file exists
    if (fs.existsSync(mdPath)) {
      fullPath = mdPath
    } else if (fs.existsSync(mdxPath)) {
      fullPath = mdxPath
    } else {
      console.error('Neither .md nor .mdx file exists:', { mdPath, mdxPath })
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    data['content'] = content
    return data as reDocument
  }

  const updateDocumentjson = (data: FormDocument, oldSlug: string | null = null) => {
    const { getMetadata, updateMetadata } = useMetadatas()
    let metadata = getMetadata(); // Parse JSON string to JavaScri
    if (!oldSlug) {
      metadata = [data, ...metadata]
    } else {
      metadata.forEach((element: FormDocument, index: number) => {
        if (element.slug === oldSlug) {
          metadata[index] = data
        }
      });
    }
    updateMetadata(metadata)
  }

  const createDocument = (data: FormDocument, content: string) => {
    const filePath = join(CONTENT_PATH, `${data.collection}/${data.slug}.md`)
    const fileContent = matter.stringify(content, data)
    fs.writeFileSync(filePath, fileContent)
    updateDocumentjson(data)
  }

  const updateDocument = (data: FormDocument, content: string, oldSlug: string) => {
    const oldFilePath = join(CONTENT_PATH, `${data.collection}/${oldSlug}.md`)
    const newFilePath = join(CONTENT_PATH, `${data.collection}/${data.slug}.md`)
    const fileContent = matter.stringify(content, data)
    fs.writeFileSync(oldFilePath, fileContent)
    if (oldSlug !== data.slug) {
      fs.renameSync(oldFilePath, newFilePath)
    }
    updateDocumentjson(data, oldSlug)
  }

  const deleteDocument = (collection: string, slug: string) => {
    const filePath = join(CONTENT_PATH, `${collection}/${slug}.md`)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      const { getMetadata, updateMetadata } = useMetadatas()
      const metadata = getMetadata(); // Parse JSON string to JavaScri
      const _saveData = metadata.filter((item: FormDocument) => !(item.slug === slug && item.collection === collection))
      updateMetadata(_saveData)
      return true;
    }
    return false;
  }


  //




  return {
    getDocuments,
    getDocumentBySlug,
    createDocument,
    updateDocument,
    deleteDocument
  }

}
