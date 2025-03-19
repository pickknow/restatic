
import {
  Link,
} from "@remix-run/react";
import {createFixedLengthString} from '@/libs/handleFunctions'
import { FormDocument } from '@/types/public'
import { AiOutlineArrowRight } from "react-icons/ai";
export function Documents({ documents, collectionId, defaultImg }
  : { documents: FormDocument[] | undefined, collectionId: string, defaultImg: string }) {
  return (
    <div className="sm:container mx-auto">
      <div className="mt-5 grid sm:grid-cols-4  sm:min-h-[800] gap-8 p-2" >
        {documents?.map((document, index: number) => (
          <div key={index} className="card card-compact bg-base-100  shadow-xl sm:mt-0 mt-2">
              <figure className="items-center flex h-[240px] bg-gray-400">
              <img className="" src={document.coverImage || defaultImg} alt="ReStatic" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{document.title }</h2>
              <p>{createFixedLengthString(document.description, 120)}</p>
              <div className="card-actions justify-end">
                <Link to={`/${collectionId}/${document.slug}`} className="text-2xl p-2 rounded-full hover:border border hover:border-black">
                  <AiOutlineArrowRight />
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
