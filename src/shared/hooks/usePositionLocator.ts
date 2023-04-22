import { RefObject, useCallback, useState } from 'react';
import { EPositions } from '../enums';

export const usePositionLocator = () => {
  /**
   * Используются для запоминания положения элемента, по которому был клик
   */
  const [toWindowBottomPx, setToWindowBottomPx] = useState(0);
  const [toWindowTopPx, setToWindowTopPx] = useState(0);
  const [toWindowLeftPx, setToWindowLeftPx] = useState(0);
  const [toWindowRightPx, setToWindowRightPx] = useState(0);

  const [enabledPosition, setEnabledPosition] = useState(EPositions.BottomRight);

  const changeClickPosition = useCallback((target: Element) => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const targetRect = target.getBoundingClientRect();

    setToWindowBottomPx(windowHeight - targetRect.y);
    setToWindowTopPx(targetRect.y);
    setToWindowLeftPx(targetRect.x);
    setToWindowRightPx(windowWidth - targetRect.x);

  }, []);

  const getOpenPopupPosition = useCallback((popupRef: RefObject<HTMLElement>) => {
    if (!popupRef.current) {
      return;
    }
    const hasBottomSpace = toWindowBottomPx > popupRef.current.clientHeight;
    const hasTopSpace = toWindowTopPx > popupRef.current.clientHeight;
    const hasRightSpace = toWindowRightPx > popupRef.current.clientWidth;
    const hasLeftSpace = toWindowLeftPx > popupRef.current.clientWidth;

    /**
     * Необходимо для того, что бы принудительно не менять положение, если нет необходимости
     */
    switch (enabledPosition) {
      case EPositions.TopRight:
        if (hasTopSpace && hasRightSpace) {
          return;
        }
        break;
      case EPositions.TopLeft:
        if (hasTopSpace && hasLeftSpace) {
          return;
        }
        break;
      case EPositions.BottomRight:
        if (hasBottomSpace && hasRightSpace) {
          return;
        }
        break;
      case EPositions.BottomLeft:
        if (hasBottomSpace && hasLeftSpace) {
          return;
        }
        break;
    }

    if (hasBottomSpace) {
      setEnabledPosition(hasRightSpace ? EPositions.BottomRight : EPositions.BottomLeft);
    } else {
      setEnabledPosition(hasRightSpace ? EPositions.TopRight : EPositions.TopLeft);
    }
  }, [enabledPosition, toWindowBottomPx, toWindowLeftPx, toWindowRightPx, toWindowTopPx]);

  return {
    changeClickPosition,
    getOpenPopupPosition,
    enabledPosition,
  };
};
