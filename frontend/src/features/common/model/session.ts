import { createFetching, Fetching } from '@/src/lib/fetching'
import { accountApi } from '@/src/api/account'
import { app } from '@/src/features/common'
import { IUser } from '@/src/types/user'

export const loadSession = app.createEffect<void, IUser, Error>()
const sessionFetching: Fetching<IUser, Error> = createFetching(loadSession)

export const $session = app.createStore<IUser>(null)

loadSession.use(() => accountApi.getInfo())

$session
  .on(loadSession.done, (_, { result: user }) => user)

