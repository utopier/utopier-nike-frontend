import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

interface IModalOverlayStyledProps {
  visible: boolean
}

const ModalOverlay = styled.div<IModalOverlayStyledProps>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalWrapper = styled.div<IModalOverlayStyledProps>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .modal-close {
    background-color: black;
    color: white;
    text-decoration: none;
    width: 35px;
    height: 35px;
    align-self: flex-end;
  }
`;

interface IErrorModalProps {
  className?: string;
  visible?: boolean;
  children?: React.ReactNode;
  maskClosable?: boolean;
  closable?: boolean;
  onClose?: (e:React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  error?: object;
}


const Error : React.FC<IErrorModalProps> = ({ error,className, visible, children, maskClosable, closable, onClose }) => {
  const closeBtnRef = useRef(null); 
  // const [keyPressedEscape, setKeyPressedEscape] = useState(false)

  useEffect(() => {
    // setKeyPressedEscape(false);
  
    // X Button Focus : Enter시 닫힘
    closeBtnRef.current.focus();
  
    // ESC KeyDown시 닫힘.
    // document.addEventListener('keydown',keyPressEscape)
  },[]);
  
  // const keyPressEscape = (e) => {
  //   if(e.key === 'Escape'){
  //     setKeyPressedEscape(true);
  //   }
  // }

  const onMaskClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClose) {
      onClose(e);
    }
  };
  console.log('ErrorModal Rendering')
  // console.log('keyPressedEscape : ', keyPressedEscape);
  console.log('visible : ',visible);
  return (
    <>
      <ModalOverlay visible={visible}>
        <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex={-1} visible={visible}>
          <ModalInner tabIndex={0} className="modal-inner">
            <div style={{paddingTop: '7px', color: 'black'}}>{error || 'Login 하셔야 합니다.'}</div>
            <div style={{paddingTop: '7px'}}>
             <Link to='/login'>로그인 | </Link> 
             <Link to='/signup'>회원가입</Link>
            </div>
            {closable && (
              <button ref={closeBtnRef} className="modal-close" onClick={close}>
                X
              </button>
            )}
          </ModalInner>
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
};

export default Error;
