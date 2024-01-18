import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import webworkerURL from './webworker.worker';
//import webworkerURL from './webworker.worker.ts';
import { useEffect, useState } from 'react';

function Hello() {
  const [webworker, setWebworker] = useState<Worker | undefined>();
  const [webworkerTime, setWebworkerTime] = useState<number | undefined>();

  useEffect(() => {
    // Cant do it this way because of commonjs modules
    //const worker = new Worker(new URL('./webworker.worker.ts', import.meta.url));
    //const worker = new Worker(webworkerURL);
    //const worker = new Worker(new URL(webworkerURL.toString(), 'http://localhost:1212/'));
    const worker = new Worker(new URL('./webworker.worker.ts', 'http://localhost:1212/'));
    console.log('worker', worker);
    worker.onmessage = (event) => {
      setWebworkerTime(event.data);
    }
    setWebworker(worker);

    return () => {
      worker.terminate();
    }
  }, []);

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate with a webworker</h1>
      <div className="Hello">
        Message with time received from webworker at: <span id="message">{webworkerTime ? new Date(webworkerTime ?? 0).toLocaleTimeString() : 'Not received'}</span>

      </div>
    </div>
  );
}

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
