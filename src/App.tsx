import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorFallback from './components/ErrorFallback'
import styles from './styles.module.scss'

function Bomb() {
  throw new Error('💥 CABOOM 💥')
  return null
}

function App() {
  const [name, setName] = useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <div>
      <input className={styles.usernameInput} value={name} onChange={onChange} />
      <hr />
      <h3>Fallback</h3>
      <ErrorBoundary fallback={<p>Something is wrong</p>}>{name === 'Bomb' ? <Bomb /> : <p>{name}</p>}</ErrorBoundary>

      <hr />
      <h3>FallbackComponent</h3>
      <ErrorBoundary onReset={() => setName('')} FallbackComponent={ErrorFallback}>
        {name === 'Bomb' ? <Bomb /> : <p>{name}</p>}
      </ErrorBoundary>

      <hr />
      <h3>FallbackRender</h3>
      <ErrorBoundary onReset={() => setName('')} fallbackRender={(props) => <ErrorFallback {...props} />}>
        {name === 'Bomb' ? <Bomb /> : <p>{name}</p>}
      </ErrorBoundary>

      <hr />
      <h3>FallbackRender with resetKeys</h3>
      <ErrorBoundary
        resetKeys={[name]}
        onReset={() => setName('')}
        fallbackRender={(props) => <ErrorFallback {...props} />}
      >
        {name === 'Bomb' ? <Bomb /> : <p>{name}</p>}
      </ErrorBoundary>
    </div>
  )
}

export default App
