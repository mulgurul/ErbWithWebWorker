import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import webworkerURL from './webworker.worker';
//import webworkerURL from './webworker.worker.ts';
import { useEffect, useState } from 'react';
import { WebWorkerLibTs } from './webworker/workerclass';

function Hello() {
  const [webworker, setWebworker] = useState<WebWorkerLibTs | undefined>();
  const [webworkerTime, setWebworkerTime] = useState<number | undefined>();
  const [udpDataReceived, setUdpDataReceived] = useState<string[]>([]);

  useEffect(() => {
    let worker = new WebWorkerLibTs();
    //jsWorker.sendMessage();
    setWebworker(worker);

    // App is closing/unmount, unsubscribe to everything
    return () => {
      webworker?.terminate();
      console.log('App is closing, react unmounting');
    }
  }, []);

  useEffect(() => {
    if (webworker === undefined) return;

    webworker.onMessage( (e: MessageEvent<any>) => {
      const { type, data } = e.data;
      // console.log(`Received worker message  of type ${type} from ${fromIP}`, data, );

      if(type === 'time') {
        setWebworkerTime(data)
      }
      else if(type === 'udpdata') {
      }
    });

    webworker.postMessage({
      cmd: 'init',
      data: {
        intervalMs: 1000,
        udpPort: 2000
      }
    });
  }, [webworker]);

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate with a webworker</h1>
      <div className="Hello">
        Message received from webworker, time data was:&nbsp;<span id="message">{webworkerTime ? new Date(webworkerTime ?? 0).toLocaleTimeString() : 'Not received'}</span>
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
