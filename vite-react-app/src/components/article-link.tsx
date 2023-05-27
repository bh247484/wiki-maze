import { articleUrl, canonizeTitle } from '../utils/utils';

interface IProps {
  article: string;
}

export default function ArticleLink({ article }: IProps) {
  return (
    <a className="article-link" href={articleUrl(article)}>
      {canonizeTitle(article)}
    </a>
  );
}
