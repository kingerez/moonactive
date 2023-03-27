/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FunctionComponent, useEffect, useState } from 'react';
import { borderRadius, buttonStyle } from '../shared/styles';
import { StoreItemObject } from '../shared/types';

export interface StoreItemProps {
  item: StoreItemObject;
  callback: (id: string) => void;
}

const wrapperStyle = css`
  display: flex;
  justify-content: space-between;
  border: 1px solid #34576F;
  ${borderRadius}
  padding: 10px;
  margin: 5px 0;
  font-family: arial;
`;

const textsStyle = css`
  display: flex;
  flex-direction: column;
`;

export const StoreItem: FunctionComponent<StoreItemProps> = ({ item, callback }) => {
  const { amount, limit, name, id } = item;
  const [isDisabled, setIsDisabled] = useState(amount >= limit);

  const onClickBuy = () => {
    callback(id);
  };

  useEffect(() => {
    setIsDisabled(amount >= limit);
  }, [amount, limit]);

  return (
    <div css={wrapperStyle}>
      <div css={textsStyle}>
        <span>{name}</span>
        <span>{amount}/{limit}</span>
      </div>
      <button css={buttonStyle} disabled={isDisabled} onClick={onClickBuy}>Buy now!</button>
    </div>
  );
};
