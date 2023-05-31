import { canonizeTitle } from '../utils/utils';
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
      <h2>
        Cleared in <Clock time={time} />
      </h2>
      <h2>Total Strokes: {strokes}</h2>
      <p>Stroke Formula</p>
      <p>Total steps + stroke time penalty for every 30 seconds.</p>
      <h4>Here's Your Path to Victory</h4>
      <h4>
        You reached the goal in {finalPath.length - 1} total
        {finalPath.length - 1 === 1 ? ' step' : ' steps'}.
      </h4>
      <div className={styles.path}>
        {finalPath.map((articleTitle, index) => (
          <>
            <p>{canonizeTitle(articleTitle)}</p>
            {index !== finalPath.length - 1 ? <p>↓</p> : null}
          </>
        ))}
      </div>
      <button onClick={() => setPhase(4)}>See High Scores</button>
    </div>
  );
}
