import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useUser } from '@/hooks/useUser';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/actions/auth';

export const MyDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const { isAuth } = useUser();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  // @ts-ignore
  const btnRef = React.useRef<FocusableElement | null>();

  return (
    <>
      <Box ref={btnRef} onClick={onOpen} cursor="pointer">
        <Image src="/list.svg" alt="menu" width={25} height={25} />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{t('common:s-superiority')}</DrawerHeader>
            <DrawerBody>
              <Flex direction="column" w="full" alignItems="center" mt="10">
                <Box py="3">
                  <Link href="/">
                    <ChakraLink>
                      <Heading size="md">{t('common:home')}</Heading>
                    </ChakraLink>
                  </Link>
                </Box>
                {isAuth && (
                  <>
                    <Box py="3">
                      <Link href="/data">
                        <ChakraLink>
                          <Heading size="md">{t('common:data')}</Heading>
                        </ChakraLink>
                      </Link>
                    </Box>
                    <Box py="3">
                      <Link href="/add">
                        <ChakraLink>
                          <Heading size="md">{t('common:add')}</Heading>
                        </ChakraLink>
                      </Link>
                    </Box>
                  </>
                )}
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Flex direction="row" justifyContent="center" width="full">
                {isAuth ? (
                  <ChakraLink onClick={logoutHandler}>
                    <Heading size="md" mx="5">
                      {t('common:log-out')}
                    </Heading>
                  </ChakraLink>
                ) : (
                  <>
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
                    </Link>
                  </>
                )}
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
