
type typeOfType = 'success' | 'warning' | 'info' | 'error'

export const hide = () => ({ type: 'ALERT_HIDE' } as const);
export const show = (text: string, typeOf: typeOfType = 'success', IsNotClose?: boolean) => ({ type: 'ALERT_SHOW', text, typeOf, IsNotClose } as const);






