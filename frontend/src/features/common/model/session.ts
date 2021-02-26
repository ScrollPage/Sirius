import { createFetching, Fetching } from '@/src/lib/fetching'
import { accountApi, Register, RegisterData } from '@/src/api/account'
import { app } from '@/src/features/common'

export const loadSession = app.createEffect<void, Register, Error>()
export const sessionDropped = app.createEvent()
const sessionFetching: Fetching<Register, Error> = createFetching(loadSession)

export const $session = app.createStore<Register>(null)

loadSession.use(() => accountApi.getInfo())

$session
  .on(loadSession.done, (_, { result: user }) => user)
  .reset(sessionDropped)

