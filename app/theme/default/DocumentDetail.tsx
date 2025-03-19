
import { reDocument } from '@/types/public'
import 'github-markdown-css';
import { marked } from 'marked';
import { format } from 'date-fns';

export function DocumentDetail({document }:{document: reDocument | null}) {
  if(!document) return null;
  const htmlContent = marked(document.content || '');
  return(
    <div className="mx-auto mt-10 sm:max-w-[860px]">
      <h2 className="text-3xl font-bold mb-4">{document.title}</h2>
      <div className='text-xl text-gray-600'>{format(document.publishedAt, 'yyyy-MM-dd HH:mm')}</div>
      {document.description && (<div className='mt-8 bg-[#f1f1f1]  text-gray-600 p-8 rounded-2xl'>
        {document.description}
      </div>)}
      <div className="mt-8">
      <div className="markdown-body mt-8 text-[#535661]" dangerouslySetInnerHTML={{ __html: htmlContent}} ></div>
      </div>
  </div>
  )
}
