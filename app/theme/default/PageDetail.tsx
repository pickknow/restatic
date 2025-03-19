import { reDocument } from "~/types/public";
import { marked } from 'marked';
import 'github-markdown-css';

export function PageDetail({ document }:{document:reDocument}) {
  const htmlContent = marked(document.content);

  return (
    <div className='mt-14 sm:min-h-[800] md:container mx-auto'>
      <div className="mt-5 bg-[#f1f1f1]">

      </div>
     <div className="markdown-body mt-8" dangerouslySetInnerHTML={{ __html: htmlContent }} ></div>
    </div>
  )
}
