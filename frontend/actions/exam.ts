import { instance } from '@/api';

export const changeExam = async (examId: number, diagnosis: string) => {
  await instance()
    .patch(`/api/exam/${examId}/`, {
      diagnosis
    })
    .then(res => {
      console.log('Вы удачно сменили диагноз')
    })
    .catch(err => {
      console.log("Ошибка при изменении диагноза")
    })
}