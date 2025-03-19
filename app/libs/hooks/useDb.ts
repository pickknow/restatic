

import { reDocument, typeCollection, typeSearchQuery, FormDocument } from '~/types/public'
import { useMetadatas } from "./useMetadatas";
import sift, { Query } from 'sift'
import { useDocuments } from './useDocuments';
export function useDb() {
  const {getMetadata} = useMetadatas()
  const {getDocumentBySlug} = useDocuments()

  const documentDB = async<TSchema extends {} = {}>() => {
    const mdb: FormDocument[] = getMetadata()
    return {
      find: <T>(query: typeSearchQuery, fields: string[]) => {
        const subset = mdb.filter(sift(query))
        let prj = fields ?? []
        let skp = 0
        let lmt: undefined | number = undefined
        const api: any = {
          sort: (sort: <T>() => T) => {
            subset.sort(sort)
            return api
          },

          project: (projection: string[]) => {
            prj = projection
            return api
          },
          skip: (skip: number) => {
            skp = skip
            return api
          },

          limit: (limit: number) => {
            lmt = limit
            return api
          },

          first: async () => {
            const arr = await api.toArray()
            return arr?.[0]
          },
          toArray: async () => {
            // narrow down to smallest result set
            const copied = subset.slice(skp, lmt ? skp + lmt : undefined)

            const finalProjection = Array.isArray(prj) ? prj : Object.keys(prj)

            // check projections and load content
            const projected = await Promise.all(
              copied.map(async (m) => {
                if (
                  finalProjection.length === 0 ||
                  finalProjection.includes('content')
                ) {
                  const fileContent = getDocumentBySlug(m.collection, m.slug)
                  m.content = fileContent?.content
                }
                // start as any, cast to projection
                const result: any = {}
                for (const p of finalProjection) {
                  if (typeof m[p as keyof typeof m] !== 'undefined') {
                    result[p] = m[p as keyof typeof m]
                  }
                }
                return result as T
              })
            )
            return projected as T[]
          }
        }
        return api
      }
    }

  }

  return {
    documentDB
  }


}
