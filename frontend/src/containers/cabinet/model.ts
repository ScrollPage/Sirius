import { Exam, examApi } from '@/src/api/exam'
import { $session, app } from '@/src/features/common'
import { $examsRegistry, listToObject } from '@/src/features/exam/model'
import { createFetching, Fetching } from '@/src/lib/fetching'
import { Effect, attach } from 'effector'

const loadExams: Effect<number, Exam[], Error> = app.createEffect()

export const examsFetching: Fetching<Exam[], Error> = createFetching(
  loadExams
)

export const $examsIds = app.createStore<number[]>([])

export const loadExamsHandler = attach({
  effect: loadExams,
  source: $session,
  mapParams: (_, { id }) => id
})

loadExams.use((patientId: number) => examApi.getPatientExams(patientId))

$examsIds.on(loadExams.done, (_, { result }) => result.map((exam) => exam.id))

$examsRegistry.on(loadExams.done, (registry, { result }) => ({
  ...registry,
  ...listToObject(result),
}))