import { instance } from '@/api';
import { getAsString } from '@/utils/getAsString';
import { createApiWithQuery } from '@/utils/queryCode';
import Router from 'next/router';
import { trigger } from 'swr';

export const changeExam = async (examId: number, changedDiagnosis: string) => {
  const patientId = getAsString(Router.query.ID);
  const diagnosis = getAsString(Router.query.diagnosis);
  const type = getAsString(Router.query.type);
  await instance()
    .patch(`/api/exam/${examId}/`, {
      diagnosis: changedDiagnosis
    })
    .then(res => {
      console.log('Вы удачно сменили диагноз')
    })
    .catch(err => {
      console.log("Ошибка при изменении диагноза")
    })
  trigger(createApiWithQuery(`/api/patient/${patientId}/exam/`, {
    diagnosis__contains: diagnosis,
    sub_exams__check_type: type,
  }));
}
