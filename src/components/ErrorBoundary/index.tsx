/*
 * @Description:
 * @Author: Tsingwong
 * @Date: 2023-01-31 14:50:45
 * @LastEditors: Tsingwong
 * @LastEditTime: 2023-02-01 18:09:55
 */

import React, { PropsWithChildren } from 'react'
import { ErrorBoundaryState, ErrorBoundaryProps, FallbackProps } from './types'

const initialState: ErrorBoundaryState = {
  error: null,
}

// 比较两个数组，返回是否相同
const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) => {
  return a.length !== b.length || a.some((item, idx) => !Object.is(item, b[idx]))
}

class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  state: ErrorBoundaryState = initialState

  // 是否已经由于 error 而引发的 render/update
  updatedWithError = false

  // 这里需要使用 箭头函数
  // 否则需要使用 bind 函数
  reset = () => {
    this.setState(initialState)
  }
  resetErrorBoundary = (...args: Array<unknown>) => {
    this.props.onReset?.(...args)
    this.reset()
  }

  componentDidUpdate(
    prevProps: Readonly<React.PropsWithChildren<ErrorBoundaryProps>>,
    prevState: Readonly<ErrorBoundaryState>,
    snapshot?: any,
  ): void {
    const { error } = this.state
    const { resetKeys, onResetKeysChange } = this.props

    if (error !== null && prevState.error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      onResetKeysChange?.(prevProps.resetKeys, resetKeys)
      this.reset()
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo)
  }
  render(): React.ReactNode {
    const { fallback, fallbackRender, FallbackComponent } = this.props
    const { error } = this.state
    if (error) {
      const fallbackProps: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      }
      if (React.isValidElement(fallback)) {
        return fallback
      } else if (typeof fallbackRender === 'function') {
        return fallbackRender(fallbackProps)
      } else if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />
      } else {
        throw new Error('react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop')
      }
    }
    return this.props.children
  }
}

export default ErrorBoundary
