import { instance } from '@/api';
import { examUrl } from '@/utils/examUrl';
import { getAsString } from '@/utils/getAsString';
import Router from 'next/router';
import { trigger } from 'swr';

export const changeExam = async (examId: number, diagnosis: string) => {
  const patientId = Number(getAsString(Router.query.ID));
  const diagnosisSearch = getAsString(Router.query.diagnosis) || "";
  const typeSearch = getAsString(Router.query.type) || "";
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
  trigger(examUrl(patientId, diagnosisSearch, typeSearch));
}
