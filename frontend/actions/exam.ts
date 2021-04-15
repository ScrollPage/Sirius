import { ExamService } from '@/api/exam';
import { ExamFormValues } from '@/components/Exam/ExamForm';
import { createClearObject } from '@/utils/queryCode';

enum Side {
  left = 0,
  right = 1,
}

export const changeExam = async (values: ExamFormValues, leftEyeId: number, rightEyeId: number) => {
  return await Promise.all([
    ExamService.changeEye(leftEyeId, formatEye(values, Side.left)),
    ExamService.changeDzn(leftEyeId, formatDzn(values, Side.left)),
    ExamService.changeEye(rightEyeId, formatEye(values, Side.right)),
    ExamService.changeDzn(rightEyeId, formatDzn(values, Side.right))
  ])
}

const formatEye = (values: ExamFormValues, idx: 0 | 1) => {
  return createClearObject({
    makula: values.makula[idx],
    periphery: values.periphery[idx],
    sight_sharpness: values.sight_sharpness[idx],
  })
}

const formatDzn = (values: ExamFormValues, idx: 0 | 1) => {
  return createClearObject({
    border: values.border[idx],
    color: values.color[idx],
  })
}