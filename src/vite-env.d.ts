/// <reference types="vite/client" />

// import * as vitest from 'vitest'

declare module 'global' {
  export const expect: typeof import('vitest')['expect'] & import('@testing-library/jest-dom')
}
