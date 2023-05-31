import ArticleLink from './article-link';
import MazeSvg from './maze-svg';
import styles from './article-node.module.css';

interface IProps {
  title: string;
  followNode: (title: string) => void;
}

export default function ArticleNode({ title, followNode }: IProps) {
  return (
    <div className={styles.wrapper}>
      <ArticleLink article={title} />
      <button
        className={styles.button}
        onClick={() => followNode(title)}
      >
        <MazeSvg/>
      </button>
    </div>
  );
}
