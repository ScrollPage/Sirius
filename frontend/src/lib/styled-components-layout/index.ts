import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface Props {
  gap?: string;
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  alignContent?: "flex-start" | "flex-end" | "center" | "space-around" | "space-between" | "stretch";
  basis?: string;
  grow?: string;
  shrink?: string;
  justify?: "flex-start" | "flex-end" | "center" | "space-around" | "space-between" | "space-evenly" | "safe center" | "unsafe center";
  order?: number;
  padding?: string;
  width?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  mx?: string;
  my?: string;
  pt?: string;
  pb?: string;
  pl?: string;
  pr?: string;
  px?: string;
  py?: string;
}


const is = (value) => typeof value !== "undefined"
const prop = (value) => (is(value) ? value : "initial")

export const mixins = (props: Props) => css`
  align-content: ${prop(props.alignContent)};
  align-items: ${prop(props.align)};
  flex-basis: ${prop(props.basis)};
  flex-grow: ${prop(props.grow)};
  flex-shrink: ${prop(props.shrink)};
  justify-content: ${prop(props.justify)};
  order: ${prop(props.order)};
  padding: ${prop(props.padding)};
  width: ${prop(props.width)};

  margin-top: ${prop(props.mt)};
  margin-bottom: ${prop(props.mb)};
  margin-left: ${prop(props.ml)};
  margin-right: ${prop(props.mr)};

  padding-top: ${prop(props.pt)};
  padding-bottom: ${prop(props.pb)};
  padding-left: ${prop(props.pl)};
  padding-right: ${prop(props.pr)};

  ${props.mx && css`
    margin-top: ${prop(props.mx)};
    margin-bottom: ${prop(props.mx)};
  `}
  ${props.my && css`
    margin-left: ${prop(props.my)};
    margin-right: ${prop(props.my)};
  `}

  ${props.px && css`
    padding-top: ${prop(props.px)};
    padding-bottom: ${prop(props.px)};
  `}
  ${props.py && css`
    padding-left: ${prop(props.py)};
    padding-right: ${prop(props.py)};
  `}
`

export const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  ${mixins}

  ${(p) =>
    p.gap &&
    css`
      & > :not(:first-of-type) {
        margin-left: ${p.gap};
      }
    `}
`

export const Col = styled.div<Props>`
  display: flex;
  flex-direction: column;
  ${mixins}

  ${(p) =>
    p.gap &&
    css`
      & > :not(:first-of-type) {
        margin-top: ${p.gap};
      }
    `}
`

export const Box = styled.div`
  ${mixins}
`