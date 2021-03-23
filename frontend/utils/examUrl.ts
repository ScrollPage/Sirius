export const examUrl = (patientId: number, diagnosis: string, type: string) => {
  const link = `${diagnosis ? `&diagnosis__contains=${diagnosis}` : ""}${type ? `&sub_exams__check_type=${type}` : ""
    }`;
  return `/api/patient/${patientId}/exam/?${link[0] === "&" ? link.substr(1) : link
    }`;
};