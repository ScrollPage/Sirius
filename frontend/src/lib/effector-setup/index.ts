import { fork, serialize } from 'effector'
import { useEffect, useMemo } from 'react'

let scope

function initializeScope(domain, initialData) {
  const _scope = fork(domain, {
    values: {
      ...(scope ? serialize(scope, { onlyChanges: true }) : {}),
      ...initialData,
    },
  })

  if (typeof window !== 'undefined') {
    scope = _scope
  }

  return _scope
}

export function useScope(domain, initialState) {
  return useMemo(() => initializeScope(domain, initialState), [
    domain,
    initialState,
  ])
}

export function useLogger(domain) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const attachLogger = require('effector-logger/attach').attachLogger;
      attachLogger(domain, {
        reduxDevtools: 'enabled',
        console: 'enabled',
        inspector: 'disabled',
      });
    }
  }, []);
}