import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const globalStyles = css`
  ${emotionReset}

  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    overflow: hidden;
  }

  #__next {
    display: flex;
    flex-direction: row;
  }
`;

