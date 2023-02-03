/*
 * @Description:
 * @Author: Tsingwong
 * @Date: 2023-02-01 18:30:59
 * @LastEditors: Tsingwong
 * @LastEditTime: 2023-02-03 16:05:45
 */
// import '@testing-library/jest-dom'

import { expect, afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(async () => {
  cleanup()
  // try {
  //   expect(console.error).not.toHaveBeenCalled()
  // } catch (e) {
  //   throw new Error(
  //     `console.error was called unexpectedly (make sure to assert all calls and console.error.mockClear() at the end of the test)`,
  //   )
  // }
})
