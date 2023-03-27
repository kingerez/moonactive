import { css } from '@emotion/react';

export const shadow = css`
  box-shadow: 1px 2px 3px rgba(0,0,0, 0.5);
`;

export const borderRadius = css`
  border-radius: 3px;
`;

export const buttonStyle = css`
  background-color: #D9605F;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 150ms;
  ${borderRadius}
  ${shadow}
  &:hover:not([disabled]) {
    transform: scale(1.1);
  }
  &[disabled] {
    background-color: lightgrey;
  }
`;
