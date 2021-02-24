import { app } from '@/src/features/common'
import Cookie from 'js-cookie'
import Router from 'next/router'
import { sample } from 'effector'


const SESSION_TIME = 24 * 3600 * 1000
// const SESSION_TIME = 1 * 30 * 1000

export const TOKEN_ID = "access-token"
const DATE_ID = "expiration-date"

export const tokenChanged = app.createEvent<string>()
const tokenDropped = app.createEvent<void>()
export const logout = app.createEvent<void>()
const checkAuthTimout = app.createEvent<number>()
export const chechAuthState = app.createEvent<void>()

export const $token = app.createStore<string>(Cookie.get(TOKEN_ID) ?? null)
export const $isAuthenticated = $token.map((token) => !!token)
const $expirationDate = app.createStore<Date>(!!parseCookie(DATE_ID) && new Date(parseCookie(DATE_ID)))

$token
  .on(tokenChanged, (_, token) => token)
  .reset(tokenDropped)

$expirationDate.on(tokenChanged, () => new Date(new Date().getTime() + SESSION_TIME))

checkAuthTimout.watch((expirationTime) => setTimeout(() => logout(), expirationTime))

logout.watch(() => {
  tokenDropped();
  Router.push({ pathname: '/' }, undefined, { shallow: false });
});

// Check Auth state
sample({
  source: { $token, $expirationDate },
  clock: chechAuthState,
  fn: ({ $token: token, $expirationDate: expirationDate }) => {
    if (!token) {
      logout();
    } else {
      if (expirationDate <= new Date()) {
        logout();
      } else {
        checkAuthTimout(expirationDate.getTime() - new Date().getTime());
      }
    }
  }
})

// Set to Cookies
$token.watch((token) => {
  if (token) {
    Cookie.set(TOKEN_ID, token)
  }
})

tokenDropped.watch(() => {
  Cookie.remove(TOKEN_ID)
  Cookie.remove(DATE_ID)
})

$expirationDate.watch((date) => {
  if (date) {
    Cookie.set(DATE_ID, date)
  }
})


function parseCookie(key: string) {
  if (Cookie.get(key) === undefined || Cookie.get(key) === null) {
    return null
  } else {
    return Cookie.getJSON(key)
  }
}