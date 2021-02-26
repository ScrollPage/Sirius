import { Exam } from '@/src/api/exam'
import { app } from '@/src/features/common'

type Registry = { [id: number]: Exam }

export const $examsRegistry = app.createStore<Registry>({})

interface WithId<T> {
  id: number;
}

export const listToObject = <T,>(list: WithId<T>[]) =>
  list.reduce((object, item) => {
    object[item.id] = item
    return object
  }, {})