import { useEffect, useState } from 'react';
import ArticleLink from '../article-link';
import Clock from '../clock';
import styles from './high-scores.module.css';

interface IProps {
  finalPath: string[];
  setPhase: (phase: number) => void,
  strokes: number;
  time: number;
}

interface IHighScores {
  id?: number;
  name: string;
  path: string[];
  seconds: number;
  strokes: number;
}

export default function HighScores({ finalPath, setPhase, strokes, time }: IProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [highScores, setHighScores] = useState<IHighScores[]>([]);
  const [name, setName] = useState<string>('');
  const [subPhase, setSubPhase] = useState<string>('');

  // Fetch high scores from backend api.
  async function fetchScores() {
    try {
      const response = await fetch('http://localhost:5000/HighScore');
      const result = await response.json();
      const sortedScores = result.sort((a: IHighScores, b: IHighScores) => a.strokes - b.strokes);
      setHighScores(sortedScores);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function submitNewScore(name: string) {
    // Update local, frontend high scores.
    const updatedScores = [...highScores];
    const newScore: IHighScores = {
      name,
      path: finalPath,
      seconds: time,
      strokes: strokes
    }
    if (updatedScores.length === 10) {
      updatedScores.splice(-1);
    }
    updatedScores.push(newScore);
    updatedScores.sort((a: IHighScores, b: IHighScores) => a.strokes - b.strokes);
    setHighScores(updatedScores);

    // Update backend db high scores.
    try {
      const response = await fetch('http://localhost:5000/HighScore', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newScore),
      });
      console.log(response);
    } catch(error) {
      console.error(error);
    } finally {
      setSubPhase('show-scores');
    }
  }

  // Init.
  useEffect(() => {
    fetchScores();
  }, []);

  // Check if new high score.
  useEffect(() => {
    if (!loading) {
      if (highScores.length < 10 || strokes < highScores[highScores.length - 1].strokes) {
        setSubPhase('new-high-score');
      } else {
        setSubPhase('show-scores');
      }
    }
  }, [highScores, loading, finalPath, strokes, time]);

  if (loading) {
    return (
      <div className="high-scores-wrapper">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (subPhase === 'new-high-score') {
    return(
      <div className="high-scores-wrapper">
        <h2>New High Score!</h2>
          <p>Enter Your Name</p>
          <input
            className={styles.input}
            maxLength={3}
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value.toUpperCase())}
            onKeyUp={({ key }) => key === 'Enter' ? submitNewScore(name) : null}
          />
          <button onClick={() => submitNewScore(name)}>Submit</button>
      </div>
    );
  }

  if (subPhase === 'show-scores') {
    return(
      <div className="high-scores-wrapper">
        <h1>High Scores</h1>
        <button onClick={() => setPhase(1)}>New Game</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Strokes</th>
              <th>Time</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
        {
          highScores.map(({ name, path, seconds, strokes }) => (
            <tr className="score-wrapper">
              <td>{name}</td>
              <td>{strokes}</td>
              <td><Clock time={seconds}/></td>
              <td><ArticleLink article={path[0]}/></td>
              <td><ArticleLink article={path[path.length - 1]}/></td>
            </tr>
          ))
        }
        </tbody>
        </table>
      </div>
    );
  }

  // This will never happen.
  // Need to have an unconditional, fallback return to appease Typescript.
  return <></>;
}