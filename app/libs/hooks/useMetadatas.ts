import fs, { read } from 'fs'
import { reDocument, typeCollection, FormDocument, typeMetaFile } from '~/types/public'
import { join } from 'path'
import { useFilePaths } from './useFilePaths'

export const useMetadatas = () => {
  const {metadataFile} = useFilePaths()


  const getMetadata = ():FormDocument[] => {
    if (!fs.existsSync(metadataFile)) {
      const jsonData = JSON.stringify({metadata: []}, null, 2);
      fs.writeFileSync(metadataFile, jsonData)
      return []
    }
    const jsonData = fs.readFileSync(metadataFile, 'utf8'); // Read file synchronously
    const data =  JSON.parse(jsonData); 
    return data.metadata as FormDocument[]
  }
  const updateMetadata = (metadata: FormDocument[]) => {
    const _saveData = JSON.stringify({ metadata }, null, 2);
    fs.writeFileSync(metadataFile, _saveData)
  }


  return {
    getMetadata,
    updateMetadata
  }


}
