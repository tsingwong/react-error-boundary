/*
 * @Description:
 * @Author: Tsingwong
 * @Date: 2023-02-01 18:15:10
 * @LastEditors: Tsingwong
 * @LastEditTime: 2023-02-03 17:29:19
 */

import { useState } from 'react'
import ErrorBoundary from '.'
import { FallbackProps } from './types'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Mock } from 'vitest'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function Bomb() {
  throw new Error('💥 CABOOM 💥')
  return null
}

const firstLine = (str: string) => str.split('\n')[0]

describe('Standard use-case', () => {
  it('fallback', async () => {
    const consoleError = console.error as Mock
    const App = () => {
      const [username, setUsername] = useState('')
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
      }

      return (
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={onChange} />
          </div>
          <div>{username}</div>
          <div>{username === 'fail' ? 'Oh no' : 'things are good'}</div>
          <div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {username === 'fail' ? <Bomb /> : 'type "fail"'}
            </ErrorBoundary>
          </div>
        </div>
      )
    }

    render(<App />)

    // userEvent.type(screen.getByRole('textbox', { name: /username/i }), 'fail')
    await userEvent.type(screen.getByRole('textbox', { name: /username/i }), 'fail')
    let input = screen.getByRole('textbox', { name: /username/i })
    expect(input).toHaveValue('fail')
    const [[actualError], [componentStack]] = consoleError.mock.calls
    expect(firstLine(actualError)).toMatchInlineSnapshot('"Error: Uncaught [Error: 💥 CABOOM 💥]"')
    // screen.debug()
    // expect(consoleError).toHaveBeenCalledTimes(2)
    expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
      <div
        role="alert"
      >
        <p>
          Something went wrong:
        </p>
        <pre>
          💥 CABOOM 💥
        </pre>
        <button>
          Try again
        </button>
      </div>
    `)

    // await userEvent.click(screen.getByRole('button', { name: /try again/i }))
    await userEvent.type(screen.getByRole('textbox', { name: /username/i }), '-not')
    await userEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
