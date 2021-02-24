import {
  Flex,
  Heading,
  Link as ChakraLink,
  Box,
  Container,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { DarkModeSwitch } from './DarkModeSwitch';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useColor } from '@/hooks/useColor';
import { MyDrawer } from './Drawer';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/actions/auth';
import { useUser } from '@/hooks/useUser';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const { bg, cl } = useColor();
  const dispatch = useDispatch();
  const { isAuth, userName } = useUser();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box
      w="full"
      borderBottomWidth={1}
      boxShadow="md"
      position="fixed"
      zIndex="2"
    >
      <Box bg="#000" py="2">
        <Container maxW="xl" height="full">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Flex alignItems="center">
              <Image src="/logo.svg" alt="Logo" width={29} height={29} />
              <Text ml="2" color="white">
                {t('common:s-superiority')}
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Box mr="2" pt="1" cursor="pointer">
                <Link href={pathname ? pathname : '/'} locale="ru">
                  <Image
                    src="/russia.svg"
                    alt="Russia"
                    width={25}
                    height={25}
                  />
                </Link>
              </Box>
              <Box pt="1" cursor="pointer">
                <Link href={pathname ? pathname : '/'} locale="en">
                  <Image
                    src="/united-states.svg"
                    alt="USA"
                    width={25}
                    height={25}
                  />
                </Link>
              </Box>
            </Flex>
            <Text display={['none', 'flex']} color="white">
              {t('common:all-right-reserved')} &#10004;
            </Text>
          </Flex>
        </Container>
      </Box>
      <Box bg={bg} color={cl}>
        <Container maxW="xl" height="full">
          <Flex
            display={['flex', 'none', 'none']}
            py="5"
            justifyContent="space-between"
            alignItems="center"
          >
            {userName && (
              <Flex>
                <Heading size="md" mr="5">
                  {userName}
                </Heading>
              </Flex>
            )}
            <MyDrawer />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            py="5"
            direction={['column', 'row', 'row']}
            display={['none', 'flex', 'flex']}
          >
            <Flex>
              <Link href="/">
                <ChakraLink>
                  <Heading size="md" mr="5">
                    {t('common:home')}
                  </Heading>
                </ChakraLink>
              </Link>
              {isAuth && (
                <>
                  <Link href="/data">
                    <ChakraLink>
                      <Heading size="md" mr="5">
                        {t('common:data')}
                      </Heading>
                    </ChakraLink>
                  </Link>
                  <Link href="/add">
                    <ChakraLink>
                      <Heading size="md">{t('common:add')}</Heading>
                    </ChakraLink>
                  </Link>
                </>
              )}
            </Flex>
            <Flex>
              {isAuth ? (
                <Flex>
                  <Flex>
                    <Box mr="1">
                      <Image
                        src="/man.svg"
                        alt="Russia"
                        width={25}
                        height={25}
                      />
                    </Box>
                    <Heading size="md" mr="5">
                      {userName}
                    </Heading>
                  </Flex>
                  <Heading size="md" mr="5">
                    |
                  </Heading>
                  <ChakraLink onClick={logoutHandler}>
                    <Heading size="md">{t('common:log-out')}</Heading>
                  </ChakraLink>
                </Flex>
              ) : (
                <Flex>
                  <Link href="/register">
                    <ChakraLink>
                      <Heading size="md" mr="5">
                        {t('common:sign-up')}
                      </Heading>
                    </ChakraLink>
                  </Link>
                  <Link href="/login">
                    <ChakraLink>
                      <Heading size="md">{t('common:log-in')}</Heading>
                    </ChakraLink>
                  </Link>{' '}
                </Flex>
              )}
              <Box ml="5">
                <DarkModeSwitch />
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
