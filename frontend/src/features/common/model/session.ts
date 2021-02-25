import { createFetching, Fetching } from '@/src/lib/fetching'
import { accountApi, RegisterData } from '@/src/api/account'
import { app } from '@/src/features/common'

export const loadSession = app.createEffect<void, RegisterData, Error>()
export const sessionDropped = app.createEvent()
const sessionFetching: Fetching<RegisterData, Error> = createFetching(loadSession)

export const $session = app.createStore<RegisterData>(null)

loadSession.use(() => accountApi.getInfo())

$session
  .on(loadSession.done, (_, { result: user }) => user)
  .reset(sessionDropped)

