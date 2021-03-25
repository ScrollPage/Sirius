import Cookie from 'js-cookie';

interface Props {
  userId: number;
  userName: string;
  email: string;
  isAuth: boolean;
}

export const useUser = (): Props => {
  const isAuth = !!Cookie.get('accessToken')
  const userId = Cookie.get('userId') || "";
  const userName = Cookie.get('userName') || "";
  const email = Cookie.get('email') || "";
  return { userId: Number(userId), userName, email, isAuth }
}