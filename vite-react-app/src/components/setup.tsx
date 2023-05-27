import { useState } from 'react';
import ArticleLink from './article-link';

interface IProps {
  setPhase: (phase: number) => void;
  setPoles: (poles: string[]) => void;
}

export default function Setup({ setPhase, setPoles }: IProps) {
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [startLink, setStartLink] = useState<string>('');
  const [endLink, setEndLink] = useState<string>('');

  async function getRandomArticle(): Promise<string> {
    const res = await fetch(
      'https://en.wikipedia.org/api/rest_v1/page/random/title'
    );
    const json = await res.json();
    return json.items[0].title;
  }

  function parseArticle(link: string): string {
    return link.split('/').slice(-1)[0];
  }

  return (
    <>
      <div className="setup-wrapper">
        <div>
          <h1>Start</h1>
          <h3>
            {start === '' ? (
              'Select Start Article'
            ) : (
              <ArticleLink article={start} />
            )}
          </h3>
          <button
            onClick={async () => {
              setStart('Loading');
              const article = await getRandomArticle();
              console.log(article);
              setStart(article);
            }}
          >
            Get Random Article
          </button>
          <p>Or paste article link below.</p>
          <input
            type="text"
            value={startLink}
            onChange={({ target: { value } }) => setStartLink(value)}
          />
          <button
            onClick={() => {
              setStart(parseArticle(startLink));
              setStartLink("");
            }}
          >
            Submit
          </button>
        </div>
        <div>
          <h1>End</h1>
          <h3>
            {end === '' ? 'Select End Article' : <ArticleLink article={end} />}
          </h3>
          <button
            onClick={async () => {
              setEnd('Loading');
              const article = await getRandomArticle();
              console.log(article);
              setEnd(article);
            }}
          >
            Get Random Article
          </button>
          <p>Or paste article link below.</p>
          <input
            onChange={({ target: { value } }) => setEndLink(value)}
            type="text"
            value={endLink}
          />
          <button
            onClick={() => {
              setEnd(parseArticle(endLink));
              setEndLink('');
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <br />
      <br />
      {start !== '' && end !== '' ? (
        <button
          onClick={() => {
            setPoles([start, end]);
            setPhase(2);
          }}
        >
          Start Game!
        </button>
      ) : (
        <p>Select a 'Start' and 'End' point to begin the game</p>
      )}
    </>
  );
}
