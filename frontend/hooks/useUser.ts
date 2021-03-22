import Cookie from 'js-cookie';

interface Props {
  userId: string;
  userName: string;
  email: string;
  isAuth: boolean;
}

export const useUser = (): Props => {
  const isAuth = !!Cookie.get('token')
  const userId = Cookie.get('userId') || "";
  const userName = Cookie.get('userName') || "";
  const email = Cookie.get('email') || "";
  return { userId, userName, email, isAuth }
}