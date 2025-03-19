
import { useCollections } from "./useCollections"
import { useDb } from "./useDb";
import { marked } from 'marked';
import { useSettings } from "@/libs/hooks/useSettings";
import { typeCollection } from "@/types/public";


export function useIndexPage() {
  const { getSettingByKey } = useSettings()

  const getTopContent = async ():Promise<string> => {
    const content  = getSettingByKey('indexTop')
    return await marked(content || '');
  }

  const getEndContent = async():Promise<string> => {
    const content = getSettingByKey('indexBottom')
    return await marked(content || '');
  }

  const getCollections = async (): Promise<typeCollection[]> => {
    const { documentDB } = useDb()
    const db = await documentDB()
    const { getCollections } = useCollections()
    const _cols = getCollections().filter(item => !item.hidden && item.slug!=='pages')
    for (const col of _cols) {
      col['chindren'] = await db.find({ collection: col.slug },
        ['title', 'slug', 'coverImage', 'description', 'state', 'publishedAt']).limit(4).toArray()
    }
    return _cols as typeCollection[]
  }
  return {
    getTopContent,
    getEndContent,
    getCollections
  }

}
