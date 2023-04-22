import React, { useEffect, useRef } from 'react';

type TClickAwayListenerProps = {
  onClickAway: () => void;
  children: React.ReactNode;
}

export const ClickAwayListener = React.memo<TClickAwayListenerProps>(({
  onClickAway,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Необходимо что бы избежать срабатываение при клике на скроллах
      // @ts-ignore
      const isClickedOnScroll = (event.offsetX > event.target?.clientWidth || event.offsetY > event.target.clientHeight)
      if (!isClickedOnScroll && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClickAway();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickAway]);

  return <div ref={wrapperRef}>{children}</div>;
})