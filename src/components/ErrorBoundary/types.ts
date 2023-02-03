/*
 * @Description:
 * @Author: Tsingwong
 * @Date: 2023-02-01 17:47:15
 * @LastEditors: Tsingwong
 * @LastEditTime: 2023-02-01 17:54:55
 */

import React from 'react'

// 错误后展示的元素类型
export type FallbackElement = React.ReactElement<unknown, string | React.FC | typeof React.Component> | null

export interface FallbackProps {
  error: Error
  // 重置 Error Boundary 组件
  resetErrorBoundary: () => void
}
export type FallbackRender = (props: FallbackProps) => FallbackElement

interface ErrorBoundaryPropsBase {
  onResetKeysChange?: (prevResetKeys: Array<unknown> | undefined, resetKeys: Array<unknown> | undefined) => void
  onReset?: (...args: Array<unknown>) => void
  onError?: (error: Error, info: { componentStack: string }) => void
  resetKeys?: Array<unknown>
}

interface ErrorBoundaryPropsWithComponent extends ErrorBoundaryPropsBase {
  FallbackComponent?: React.ComponentType<FallbackProps>
  fallback?: never
  fallbackRender?: never
}

interface ErrorBoundaryPropsWithRender extends ErrorBoundaryPropsBase {
  FallbackComponent?: never
  fallback?: never
  fallbackRender?: FallbackRender
}

interface ErrorBoundaryPropsWithFallback extends ErrorBoundaryPropsBase {
  FallbackComponent?: never
  fallback?: FallbackElement
  fallbackRender?: never
}

export type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithRender

export interface ErrorBoundaryState {
  error: Error | null
}
