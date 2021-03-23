import React, { Dispatch, SetStateAction } from "react";
import {
  Paginator as ChakraPaginator,
  Container,
  Previous,
  Next,
  PageGroup,
} from "chakra-paginator";
import { ButtonProps } from "@chakra-ui/button";

const outerLimit = 2;
const innerLimit = 2;

const baseStyles: ButtonProps = {
  w: 10,
  fontSize: "sm",
};

const normalStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    bg: "purple.200",
  },
};

const activeStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    bg: "purple.300",
  },
  bg: "purple.300",
};

const separatorStyles: ButtonProps = {
  w: 10,
  bg: "purple.200",
};

interface Props {
  currentPage: number;
  setCurrentPage: (nextPage: number) => void;
  pagesQuantity: number;
}

export const Paginator: React.FC<Props> = ({
  setCurrentPage,
  currentPage,
  pagesQuantity,
}) => {
  return (
    <ChakraPaginator
      activeStyles={activeStyles}
      innerLimit={innerLimit}
      currentPage={currentPage}
      outerLimit={outerLimit}
      normalStyles={normalStyles}
      separatorStyles={separatorStyles}
      pagesQuantity={pagesQuantity}
      onPageChange={setCurrentPage}
    >
      <Container align="center" justify="space-between" w="full" p={4}>
        <Previous>Назад</Previous>
        <PageGroup isInline align="center" />
        <Next>Далее</Next>
      </Container>
    </ChakraPaginator>
  );
};
