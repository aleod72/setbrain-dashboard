import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getArticleById } from "utils/articles";
import { cookies } from 'next/headers';
import { Database } from "types/database";
import { ArticleContentPreview } from "admin/article-content-preview";
import { Button } from "ui/components/button/Button";
import Link from 'next/link';
import { BackHead } from "../../../back-head";

export default async function ArticlePreviewPage ({params: {articleId}}: {params: {articleId: string}}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {data} = await getArticleById(articleId, supabase);

  return <div className="flex flex-col gap-3">
    <BackHead/>
    <h1 className="text-title-h3 font-bold">{data?.title}</h1>
    <Button>
      <Link href={articleId + '/edit'}>
        Modifier
      </Link>
    </Button>
    <ArticleContentPreview content={data?.content || ''}/>
  </div>;
}
