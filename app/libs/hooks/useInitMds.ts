import fs, { read } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { useFilePaths } from './useFilePaths'
import { initCollection } from '@/types/initSchemes'
import { translateDir } from '../server/wordToMarkdown'
import { titleToSlug, } from '@/libs/handleFunctions'



export function useInitMds() {


  const MD_MDX_REGEXP = /\.(md|mdx)$/
  const readMdMdxFiles = (path: string) => {
    try {
      const dirents = fs.readdirSync(path, { withFileTypes: true })
      const mdMdxFiles = dirents
        .filter((dirent) => dirent.isFile() && MD_MDX_REGEXP.test(dirent.name))
        .map((dirent) => dirent.name)
      return mdMdxFiles
    } catch (error) {
      console.error({ readMdMdxFiles: error })
      return []
    }
  }
  
  const reInit = async()=> {
    const { CONTENT_PATH, collectionFile, metadataFile } = useFilePaths()
    const connectDir = fs.existsSync(CONTENT_PATH)
    if (!connectDir) {
      throw Error('contents dir not found')
    }
  
    const _dirs = fs.readdirSync(CONTENT_PATH);
    const dirs = _dirs.filter(dir => fs.statSync(join(CONTENT_PATH, dir)).isDirectory())
    const collections = dirs.map(dir => ({
      title: dir,
      slug: dir.toLocaleLowerCase(),
      hidden: false
    }))
    const cJsonData = JSON.stringify(collections, null, 2);
    fs.writeFileSync(collectionFile, cJsonData)
  
  
    let metadata = []
    for (let dir in dirs) {
      const _adata = {...initCollection, title: dirs[dir] }
      const _jsonData = JSON.stringify(_adata, null, 2);
      fs.writeFileSync(join(CONTENT_PATH, dirs[dir],'schema.json'), _jsonData) 
      await translateDir(join(CONTENT_PATH, dirs[dir]))
      const files = readMdMdxFiles(join(CONTENT_PATH, dirs[dir]))
      for (const file in files) {
        const filePath = join(CONTENT_PATH, dirs[dir], files[file])
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        data['title'] = data['title'] || files[file].split('.')[0]
        data['title'] = data['title'].toLocaleLowerCase()
        data['collection'] = dirs[dir]
        data['slug'] = data['slug'] || titleToSlug(data['title'])
        data['description'] = data['description'] || null
        data['coverImage'] = data['coverImage'] || null
        data['status'] = data['status'] || 'published'
        data['publishedAt'] = data['publishedAt'] || new Date().toISOString()
        const fileContent = matter.stringify(content, data)
        fs.writeFileSync(filePath, fileContent)
        const newName = titleToSlug(data['title'])
        if (newName !== data['title']) {
          fs.renameSync(filePath, join(CONTENT_PATH, dirs[dir], `${newName}.md`));
        }
        metadata.push(data)
      }
    }
    const _saveData = JSON.stringify({ metadata }, null, 2);
    fs.writeFileSync(metadataFile, _saveData)
    return true
  }
  return {
    reInit
  }

}
