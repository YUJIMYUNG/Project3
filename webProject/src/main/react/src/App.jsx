import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>import { useState } from 'react'
            import reactLogo from './assets/react.svg'
            import viteLogo from '/vite.svg'
            import './App.css'

            function App() {
              const [count, setCount] = useState(0)

              const 자바와통신함수 = async () => {
                // const response = await fetch('자바HTTP경로');
                const response = await fetch('http://localhost:8080/react');
                console.log(response);
              }

              자바와통신함수();

              return (
                <>
                  <h3>제목 : 스프링과 통신 해보기</h3>
                  <div>
                    <a href="https://vite.dev" target="_blank">
                      <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
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
              )
            }

            export default App

        <a href="https://react.dev" target="_blank">
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
  )
}

export default App
