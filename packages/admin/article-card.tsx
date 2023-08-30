import { Article } from 'types/database';
import React from 'react';
import { Button } from 'ui/components/button/Button';
import { useRouter } from 'next/navigation';

interface ArticleCardProps {
    article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const router = useRouter();

  return (
        <div className="flex gap-4 items-center justify-between py-2 px-4 bg-darkgrey-100 rounded-xl border-2 border-darkgrey-48 h-fit ">
            <span className="font-m text-m font-white-100">
                {article.title}
            </span>
            <Button small={true} onClick={() => router.push('admin/articles/' + article.id) }>Lire</Button>
        </div>
    );
};
