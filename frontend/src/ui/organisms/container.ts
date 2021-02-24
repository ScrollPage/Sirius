import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 0 15px;
  width: 100%;
  @media (min-width: 575.98px) {
    padding: 0 calc(50vw - 270px);
  }
  @media (min-width: 767.98px) {
    padding: 0 calc(50vw - 360px);
  }
  @media (min-width: 991.98px) {
    padding: 0 calc(50vw - 480px);
  }
  @media (min-width: 1199.98px) {
    padding: 0 calc(50vw - 590px);
  }
`;

