import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`


export const  ExpoStatusHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0 12px;
  /* border-bottom: 1px solid var(--color-main-bg); */
  box-sizing: border-box;

  > span {
    /* margin-left: 10px; */
    color: var(--color-text-dominant);
    font-weight: 400;
    font-family: 'Open Sans';
  }

  > svg {
    width: 32px;
    height: 32px;
    
  }
`

export const ExpoActivitiesWrapper = styled.div`
  display: flex;
  min-height: 100px;
  padding: 12px;
  box-sizing: border-box;
`