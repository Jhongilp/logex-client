import { PropsWithChildren } from "react";
import styled, { keyframes } from "styled-components";
// import Backdrop from "../Backdrop/Backdrop";

type BackdropProps = {
  onClose?: () => void;
  open: boolean;
  full?: boolean;
  lateral?: boolean;
};

export type ModalProps = {
  visible: boolean;
};

export const Backdrop = styled.div<{ $open: boolean; $full: boolean }>`
  display: ${(props) => (props.$open === true ? "flex" : "none")};
  /* position: absolute; */
  position: absolute;
  top: ${(props) => (props.$full ? 0 : "50px")};
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  opacity: 0.4;
  box-sizing: border-box;
  z-index: 99999;
`;

export const StyledModal = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1000000;
  background-color: white;
  width: 60%;
  padding: 2em 2em;
  left: 20%;
  top: 15%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  transform: ${(props) =>
    props.$visible ? "translateY(0vh)" : "translateY(-100vh)"};
  opacity: ${(props) => (props.$visible ? "1" : "0")};
`;

const scale = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const CenteredModal = styled(StyledModal)`
  display: ${(props) => (props.$visible ? "flex" : "none")};
  left: 20%;
  top: 66px;
  border-radius: 5px;
  box-shadow: -3px 5px 10px 0px rgba(58, 58, 62, 0.7);
  width: 60%;
  /* min-height: 80vh; */
  animation: ${scale} 0.2s ease-in;
  transition: none;
  transform: none;
`;

export const OptionModal = styled(CenteredModal)`
  position: absolute;
  top: 0;
  left: 110%;
  width: 120px;
  height: 100px;
  background-color: var(--color-main);
  border-radius: 0px;
  box-shadow: 2px 3px 6px 0px rgba(58, 58, 62, 0.7);
  padding: 0;
  text-transform: capitalize;
`;

export const LateralModal = styled(StyledModal)`
  width: 650px;
  height: 100%;
  top: 0;
  left: 100%;
  transform: ${(props) =>
    props.$visible ? "translateX(-100%)" : "translateX(0)"};
`;

export const Modal = ({
  children,
  open,
  full,
  lateral,
  onClose,
}: PropsWithChildren<BackdropProps>) => {
  let modal = <StyledModal $visible={open}>{children}</StyledModal>;
  if (lateral) {
    modal = <LateralModal $visible={open}>{children}</LateralModal>;
  }

  return (
    <>
      <Backdrop $open={open} $full={full} onClick={onClose} />
      {modal}
    </>
  );
};
