import { useEffect, useState } from 'react';
import ArticleLink from '../article-link';
import ArticleNode from '../article-node';
import Clock from '../clock';
import { calculateStrokes } from '../../utils/utils';
import styles from './trial.module.css';

interface IProps {
  goal: string;
  setFinalPath: (finalPath: string[]) => void;
  setPhase: (phase: number) => void;
  setStrokes: (strokes: number) => void,
  start: string;
  time: number;
}

export default function Trial({
  goal,
  setFinalPath,
  setPhase,
  setStrokes,
  start,
  time,
}: IProps) {
  const [current, setCurrent] = useState<string>('');
  const [path, setPath] = useState<string[]>([]);
  const [nodes, setNodes] = useState<string[]>([]);

  useEffect(() => {
    setCurrent(start);
    setPath([start]);
  }, []);

  useEffect(() => {
    // Update nodes.
    if (current !== '') {
      fetchNodes(current);
    }
    if (current === goal) {
      setFinalPath(path);
      setStrokes(calculateStrokes(time, path.length));
      setPhase(3);
    }
  }, [current]);

  function fetchNodes(title: string): void {
    // Handles the paged json returns.
    async function recursiveFetch(url: string, nodeAcc: string[]) {
      const response = await fetch(url);
      const json = await response.json();
      const pages: {
        x: { links: { ns: number; title: string }[] };
      } = json.query.pages;

      const newNodes: string[] = Object.values(pages)[0].links.reduce(
        // Filter out unwanted articles and return only their string title.
        (acc: string[], { title, ns }: { ns: number; title: string }) => {
          if (ns === 0) {
            return [...acc, title.split(' ').join('_')];
          }
          return acc;
        },
        []
      );

      nodeAcc = [...nodeAcc, ...newNodes];
      setNodes(nodeAcc);

      if (json.continue) {
        const urlObj = new URLSearchParams(url);
        urlObj.delete('plcontinue');
        const clippedUrl = decodeURIComponent(urlObj.toString());
        recursiveFetch(
          `${clippedUrl}&plcontinue=${json.continue.plcontinue}`,
          nodeAcc
        );
      }
    }

    let nodeAcc: string[] = [];
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${title}&prop=links&format=json&pllimit=50`;
    recursiveFetch(url, nodeAcc);
  }

  function followNode(title: string): void {
    setPath([...path, title]);
    setCurrent(title);
  }

  console.log('Path', path);
  console.log('Current', current);

  function backUp(): void {
    setCurrent(path[path.length - 2]);
    setPath(path.slice(0, -1));
  }

  return (
    <div className="trial-wrapper">
      <h1>Trial</h1>
      <div className={styles.header}>
        <div className={styles['header-col-1']}>
          <h3>Game Clock</h3>
          <p><Clock time={time} /></p>
          <button onClick={() => setPhase(1)}>New Game</button>
        </div>
        <div className={styles['header-col-2']}>
          <h4>
            Current: <ArticleLink article={current} />
          </h4>
          <h4>
            Start: <ArticleLink article={start} />
          </h4>
          <h4>
            Goal: <ArticleLink article={goal} />
          </h4>
        </div>
      </div>
      <button
        disabled={path.length <= 1}
        onClick={() => backUp()}
      >
        Go Back
      </button>
      <div className={styles['nodes-container']}>
        {nodes.map((node) => (
          <ArticleNode title={node} followNode={followNode} />
        ))}
      </div>
    </div>
  );
}
