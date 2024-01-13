import { useState } from "react";
import reactLogo from "./assets_/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import getLastModifiedLabel_ from "./utils_/getLastModifiedLabel_";

import FirstPage_ from "./pages_/FirstPage_";

const lastModifiedLabel = getLastModifiedLabel_();
function App() {
  // return <OriginialViteApp />;
  return (
    <div>
      <h2>Vite React JS Template</h2>
      <FirstPage_ />
      <a
        href="https://github.com/exemplar-codes/vite-react-js-template"
        target="_blank"
        rel="noreferrer"
      >
        Source code (github repo)
      </a>
      <time style={{ display: "block" }}>
        Last modified: {lastModifiedLabel}
      </time>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function OriginialViteApp() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
