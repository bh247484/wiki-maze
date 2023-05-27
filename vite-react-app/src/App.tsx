import { useState } from 'react';
import useInterval from './utils/useInterval';
import './App.css';
import Setup from './components/setup';
import Trial from './components/trial';
import GameReport from './components/game-report';

function App() {
  const [phase, setPhase] = useState<number>(1);
  const [poles, setPoles]= useState<string[]>([]);
  const [finalPath, setFinalPath] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);

  useInterval(
    () => {
      setTime((time: number) => time + 1);
    },
    phase === 2 ? 1000 : null
  );

  return (
    <div className="App">
      {
        {
          1: <Setup setPhase={setPhase} setPoles={setPoles} />,
          2: (
            <Trial
              start={poles[0]}
              setFinalPath={setFinalPath}
              setPhase={setPhase}
              time={time}
              goal={poles[1]}
            />
          ),
          3: <GameReport time={time} finalPath={finalPath} />,
        }[phase]
      }
    </div>
  );
}

export default App;
