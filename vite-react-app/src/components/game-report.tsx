import { canonizeTitle } from '../utils/utils';
import ArticleLink from './article-link';
import Clock from './clock';
import styles from './game-report.module.css';

interface IProps {
  finalPath: string[];
  setPhase: (phase: number) => void,
  strokes: number
  time: number;
}

export default function GameReport({ finalPath, setPhase, strokes, time }: IProps) {
  return (
    <div className="game-report-wrapper">
      <h1>Winner!</h1>
      <p>
        You reached the goal in <strong><Clock time={time} /></strong> with <strong>{finalPath.length - 1}</strong> total
        {finalPath.length - 1 === 1 ? ' step' : ' steps'}.
      </p>
      <h3>Total Strokes: {strokes}</h3>
      <p className={styles.minip}>Strokes formula: Total steps plus 1 for every 30 seconds taken.</p>
      {/* <p>Stroke Formula</p>
      <p>Total steps + stroke time penalty for every 30 seconds.</p> */}
      <h4>Path to Victory</h4>
      <div className={styles.path}>
        {finalPath.map((articleTitle, index) => (
          <>
            <p className={styles['node-wrapper']}><ArticleLink article={articleTitle} /></p>
            {index !== finalPath.length - 1 ? <p className={styles.arrow}>↓</p> : null}
          </>
        ))}
      </div>
      <button onClick={() => setPhase(4)}>See High Scores</button>
    </div>
  );
}
