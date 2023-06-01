import ArticleLink from '../article-link';
import TargetIcon from '../target-icon';
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
        <TargetIcon/>
      </button>
    </div>
  );
}
