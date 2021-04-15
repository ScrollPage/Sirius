import { ExamService } from '@/api/exam';
import { ExamFormValues } from '@/components/Exam/ExamForm';

export const changeExam = async (values: ExamFormValues, examId: number) => {
  await ExamService.change(examId, { eyes_info: [createObj(values, 0), createObj(values, 1)] })
    .then(res => {
      console.log('Вы удачно сменили диагноз')
    })
    .catch(err => {
      console.log("Ошибка при изменении диагноза")
    })
}

const createObj = (values: ExamFormValues, idx: 0 | 1) => {
  return {
    makula: values.makula[idx],
    periphery: values.periphery[idx],
    sight_sharpness: values.sight_sharpness[idx],
    dzn: {
      border: values.border[idx],
      color: values.color[idx],
    }
  }
}