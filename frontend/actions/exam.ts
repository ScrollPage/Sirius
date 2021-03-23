import { instance } from '@/api';
import Router from 'next/router';
import { trigger } from 'swr';

export const changeExam = async (examId: number, diagnosis: string) => {
  const patientId = Router.query.ID;
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
  trigger(`/api/patient/${patientId}/exam/`);
}