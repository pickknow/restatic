import { join } from 'path'

const CONTENT_PATH = join(process.cwd(), process.env.OST_CONTENT_PATH || 'contents')
const metadataFile = join(CONTENT_PATH, 'metadata.json')
const collectionFile = join(CONTENT_PATH, 'collections.json')
const configFile = join(process.cwd(), 'app/configs.json')

export const useFilePaths = () => {

  const getMdFilePath = (collection: string, filename: string) =>
    join(CONTENT_PATH, collection, filename)

  return {configFile,  metadataFile, collectionFile, getMdFilePath, CONTENT_PATH }
}
