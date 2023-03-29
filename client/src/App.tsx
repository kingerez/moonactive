/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { StoreItem } from './components/StoreItem';
import { borderRadius, buttonStyle, shadow } from './shared/styles';
import { useItemsWithSocket } from './useItemsWithSocket';

const wrapperStyle = css`
  background-color: #34576F;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const titleStyle = css`
  font-family: arial;
  text-align: center;
`;

const storeContainerStyle = css`
  width: 500px;
  padding: 10px;
  background-color: #F4F8F3;
  ${borderRadius}
  ${shadow}
  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
`;

const itemsContainerStyle = css`
  box-sizing: border-box;
  padding: 5px;
  ${borderRadius}
`;

const resetButton = css`
  ${buttonStyle}
  margin-top: 20px;
`;

function App() {
  const { items, updateItem, resetData } = useItemsWithSocket();

  const onClickBuy = (id: string) => {
    let i = 0;
    const interval = setInterval(() => {
      console.log('updating'); // eslint-disable-line
      updateItem(id);
      i++;
      if(i>10) {
        clearInterval(interval);
      }
    }, 0);
  };

  const resetAllData = async () => {
    resetData();
  };

  return (
    <div css={wrapperStyle}>
      <div css={storeContainerStyle}>
        <h1 css={titleStyle}>The Incredible Store</h1>
        <div css={itemsContainerStyle}>
          {items.map(item => <StoreItem key={item.name} item={item} callback={onClickBuy} />)}
        </div>
      </div>
      <button css={resetButton} onClick={resetAllData}>Reset data</button>
    </div>
  )
}

export default App
