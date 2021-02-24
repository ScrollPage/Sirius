import { IDetectorInfo } from '@/types/detector';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useTranslation from 'next-translate/useTranslation';

export const Chart: React.FC<{ data: IDetectorInfo[] }> = ({ data }) => {
  const { t } = useTranslation();

  const [param, setParam] = useState('temp');

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="purple"
          >
            {t(`data:${param}`)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setParam('temp')}>
              {t(`data:temp`)}
            </MenuItem>
            <MenuItem onClick={() => setParam('Co2')}>{t(`data:Co2`)}</MenuItem>
            <MenuItem onClick={() => setParam('humidity')}>
              {t(`data:humidity`)}
            </MenuItem>
            <MenuItem onClick={() => setParam('lightning')}>
              {t(`data:lightning`)}
            </MenuItem>
            <MenuItem onClick={() => setParam('pH')}>{t(`data:pH`)}</MenuItem>
          </MenuList>
        </Menu>
        {/* <Flex alignItems="center">
          Аномалии:
          <Flex
            marginLeft="10px"
            bg="tomato"
            height="20px"
            width="20px"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
            color="#FFFFFF"
          >
            <Text>!</Text>
          </Flex>
        </Flex> */}
      </Flex>
      <Box>
        <Line
          data={{
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
              {
                label: t(`data:${param}`),
                data: data.map((item, index) => ({
                  // @ts-ignore
                  y: item?.[param],
                  x: index + 1,
                })),
                borderColor: '#805ad5',
                backgroundColor: 'white',
              },
            ],
          }}
          height={400}
          width={600}
        />
      </Box>
    </>
  );
};
