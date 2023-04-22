import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePositionLocator } from '../../hooks';
import { ClickAwayListener } from '../click-away-listener';
import { positionEnumToCssClassMap } from './constants';
import { isInViewport } from '../../utils';
import './styles.css';

export type TOptionItem = {
  title: string;
  iconSrc: string;
  callback?: () => void;
};

type TDropdownMenuProps = {
  optionItems: TOptionItem[];
  children?: React.ReactNode;
}

export const DropdownMenu = React.memo<TDropdownMenuProps>(({
  optionItems,
  children,
}) => {
  const { changeClickPosition, getOpenPopupPosition, enabledPosition } = usePositionLocator();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isTargetVisible, setIsTargetVisible] = useState(true);
  const optionsRef = useRef<HTMLUListElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const onButtonClick = (event: React.MouseEvent) => {
    changeClickPosition(event.target as HTMLButtonElement);
    setIsOptionsOpen((isOptionsOpenValue) => !isOptionsOpenValue);
  };

  const createOnItemClick = (item: TOptionItem) => () => {
    /**
     * ВАЖНО!!!
     * Требования конфликтуют друг с другом.
     * Требование 1 гласит: "Клик внутри контента не должен закрывать дропдаун"
     * Требование 2 гласит: "Очень хорошо, если клик на пункт меню будет вызывать соответствующий ему колбэк, а после этого закрывать дропдаун."
     * Если предположить, что они не конфликтуют, то я вижу только один возможный сценарий - когда есть
     * колбэк - вызывать его а потом закрывать дропдаун
     */
    if (item.callback) {
      item.callback();
      setIsOptionsOpen(false);
    }
  };

  useLayoutEffect(() => {
    getOpenPopupPosition(optionsRef);
  }, [getOpenPopupPosition, isOptionsOpen]);

  const onClickAway = React.useCallback(() => {
    setIsOptionsOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        isOptionsOpen && setIsTargetVisible(isInViewport(targetRef.current));
        changeClickPosition(targetRef.current);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [changeClickPosition, isOptionsOpen]);

  return (
    <div className="wrapper">
      <ClickAwayListener onClickAway={onClickAway}>
        <div onClick={onButtonClick} ref={targetRef}>
          {children || (
            <button
              className="options-button"
              aria-label="Options"
            >
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </button>
          )}
        </div>
        {optionItems.length && isTargetVisible && isOptionsOpen && (
          <ul
            className={`options ${positionEnumToCssClassMap[enabledPosition]}`}
            ref={optionsRef}
          >
            {optionItems.map((item) => (
              <li key={item.title} onClick={createOnItemClick(item)}>
                <span>
                  {item.title}
                </span>
                <img src={item.iconSrc} className="icon" />
              </li>
            ))}
          </ul>
        )}
      </ClickAwayListener>
    </div>
  );
});
