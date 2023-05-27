import ArticleLink from './article-link';

interface IProps {
  title: string;
  followNode: (title: string) => void;
}

export default function ArticleNode({ title, followNode }: IProps) {
  return (
    <div className="article-node-wrapper">
      <ArticleLink article={title} />
      <button onClick={() => followNode(title)}>Follow Node</button>
    </div>
  );
}
