import { useState } from 'react';
import Artwork from './Artwork';
import './App.css';
import { genTokenData } from './common/utils';

function App() {
  const [tokenData, setTokenData] = useState(genTokenData(176));

  const generate = () => {
    setTokenData(genTokenData(176));
  }

  return (
    <div className="App">
      <h2>{'<Title>'} by {'<Artist>'}</h2>

      <Artwork tokenData={tokenData} canvasSize={800} drawAttributes />
      <button style={{ margin: '20px' }} onClick={generate}>Generate</button>
      <Artwork tokenData={tokenData} canvasSize={250} />

      <div style={{ margin: 'auto', marginBottom: '100px', width: '800px' }}>
        <h2>Attributes</h2>
        <h3>Palette</h3>
        <p>
          Some explanation about the attribute...
        </p>
        <h3>Size</h3>
        <p>
          Some explanation about the attribute...
        </p>
      </div>
    </div>
  );
}

export default App;
