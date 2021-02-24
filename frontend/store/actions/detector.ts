import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { show } from './alert';
import Cookie from 'js-cookie';

export const addDetector = (
  x: string,
  y: string,
): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  await instance(token)
    .post('/api/detector/ ', {
      x,
      y
    })
    .then(() => {
      dispatch(show('Вы успешно добавили датчик!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка в добавлении датчика!', 'warning'));
    });
};