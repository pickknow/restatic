import { typeCollection } from '~/types/public'
import { Documents } from '@/theme'
import 'github-markdown-css';

export function IndexHome({ collections, topContent, endContent, defaultImg }
  : { collections: typeCollection[], topContent: string, endContent: string, defaultImg: string }
) {
  return (
    <div className="flex flex-col min-h-[800px] gap-8" >
       <div 
       className="markdown-body mt-8 text-[#535661] text-lg  mb-8" 
       dangerouslySetInnerHTML={{ __html: topContent}} ></div>
      <div className='flex flex-col gap-8'>
        {collections.map((colleciont, index) => {
          return (
            <div className='flex flex-col' key={index}>
              <h2 className="flex text-3xl items-center before:mr-2  before:top-0 before:inline-block before:w-4 before:min-w-4 before:min-h-[3.2rem] before:bg-[#58c095] before:rounded-[2rem] relative">
                {colleciont.title}
              </h2>
              <Documents documents={colleciont.chindren} collectionId={colleciont.slug} defaultImg={defaultImg} />
            </div>
          )
        })}
      </div>
       <div className="markdown-body mt-8 mb-8 text-[#535661]" dangerouslySetInnerHTML={{ __html: endContent}} ></div>
    </div>
  )
}
