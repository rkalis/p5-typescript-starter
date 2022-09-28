import { useState } from 'react';
import Artwork from './Artwork';
import './App.css';
import { genTokenData } from './common/utils';
import { metadata } from './common/attributes';

function App() {
  const [tokenData, setTokenData] = useState(genTokenData(176));

  const generate = () => {
    setTokenData(genTokenData(176));
  }

  return (
    <div className="App">
      <h2>{metadata.title} by {metadata.artist}</h2>

      <Artwork tokenData={tokenData} canvasSize={800} drawAttributes />
      <button style={{ margin: '20px' }} onClick={generate}>Generate</button>
      <Artwork tokenData={tokenData} canvasSize={250} />

      <div style={{ margin: 'auto', marginBottom: '100px', width: '800px' }}>
        <h2>Attributes</h2>
        {Object.entries(metadata.attributes).map(([key, description]) => (
          <>
            <h3>{key}</h3>
            <p>{description}</p>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
