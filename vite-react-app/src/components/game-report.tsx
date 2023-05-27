import { canonizeTitle } from '../utils/utils';
import Clock from './clock';

interface IProps {
  finalPath: string[];
  time: number;
}

export default function GameReport({ finalPath, time }: IProps) {
  return (
    <div className="game-report-wrapper">
      <h1>Winner!</h1>
      <h2>
        Cleared in <Clock time={time} />
      </h2>
      <h3>Here's Your Path to Victory</h3>
      <h3>
        You reached the goal in {finalPath.length - 1} total
        {finalPath.length - 1 === 1 ? ' step' : ' steps'}.
      </h3>
      {finalPath.map((articleTitle, index) => (
        <>
          <p>{canonizeTitle(articleTitle)}</p>
          {index !== finalPath.length - 1 ? <p>↓</p> : null}
        </>
      ))}
    </div>
  );
}
