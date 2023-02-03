/*
 * @Description:
 * @Author: Tsingwong
 * @Date: 2023-01-31 15:37:12
 * @LastEditors: Tsingwong
 * @LastEditTime: 2023-01-31 16:10:14
 */
interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>出错了</p>
      <pre>{error.message}</pre>
      {resetErrorBoundary ? <button onClick={resetErrorBoundary}>重置</button> : null}
    </div>
  )
}

export default ErrorFallback
