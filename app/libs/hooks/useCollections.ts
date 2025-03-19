import fs, { read } from 'fs'
import { reDocument, typeCollection, FormDocument, typeMetaFile } from '~/types/public'
import { join } from 'path'
import { useFilePaths } from './useFilePaths'
import { initCollection } from '@/types/initSchemes'
import { useMetadatas } from './useMetadatas'


export const useCollections = () => {
  const { CONTENT_PATH, collectionFile } = useFilePaths()

  const getCollections = (): typeCollection[] => {
    if (!fs.existsSync(collectionFile)) {
      const jsonData = JSON.stringify([], null, 2);
      fs.writeFileSync(collectionFile, jsonData)
      return []
    }
    const jsonData = fs.readFileSync(collectionFile, 'utf8'); // Read file synchronously
    return JSON.parse(jsonData); // Parse JSON string to JavaScri
  }

  const createDir = (name: string) => {
    const collectionsPath = join(CONTENT_PATH, name)
    if (fs.existsSync(collectionsPath)) return;
    fs.mkdirSync(collectionsPath)
    const data = { ...initCollection, title: name }
    const jsonData = JSON.stringify(data, null, 2);
    const filePath = join(collectionsPath, 'schema.json')
    fs.writeFileSync(filePath, jsonData)
    return true
  }

  const AddCollection = (name: string) => {
    if (!createDir(name)) {
      return
    }
    const collection = { title: name, hidden: false, slug: name.toLocaleLowerCase() }
    const _cols = getCollections()
    const _jsonData = _cols.filter(item => item.title !== collection.title)
    const jsonData = JSON.stringify([collection, ..._jsonData], null, 2);
    fs.writeFileSync(collectionFile, jsonData)
    return true;
  }

  function updateCollection(collection: string, title: string, hidden: boolean) {
    const collectionData = getCollections()
    for (const col of collectionData) {
      if (col.title === collection) {
        col.title = title
        col['hidden'] = hidden
      }
    }
    const jsonData = JSON.stringify(collectionData, null, 2);
    fs.writeFileSync(collectionFile, jsonData)
    return true
  }


  const deleteCollection = (slug: string) => {
    const collectionData = getCollections()
    const connectDir = fs.existsSync(join(CONTENT_PATH, slug))
    if (!connectDir) {
      return;
    }
    fs.rmSync(join(CONTENT_PATH, slug), { recursive: true, force: true })
    const collections = collectionData.filter(item => item.slug !== slug)
    const cJsonData = JSON.stringify(collections, null, 2);
    fs.writeFileSync(collectionFile, cJsonData)
    const { getMetadata, updateMetadata } = useMetadatas()

    const metadata = getMetadata()
      .filter(item => item.collection !== slug)
    updateMetadata(metadata)
    return true;
  }


  return {
    getCollections,
    AddCollection,
    updateCollection,
    deleteCollection
  }

}
