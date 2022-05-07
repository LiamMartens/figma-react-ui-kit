import React from 'react';
import styles from './OptionMenu.module.scss';
import cx from 'classnames';
import { IconButton } from '../IconButton';
import { ControlSizes } from '../../constants';
import { Portal } from 'react-portal';

export interface IOption<V = any> {
  label: string;
  value: V;
  icon?: React.ComponentType;
  onClick?: (val: V) => void;
}

export type TriggerProps = {
  on?: boolean;
  extraRound?: boolean;
  buttonSize?: ControlSizes;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type OptionMenuProps<V = any> = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  optionMenuSize?: ControlSizes;
  placement?: 'overlay' | 'below';
  stopPropagation?: boolean;
  portal?: HTMLElement | true;
  portalScrollParent?: HTMLElement;
  portalScroll?: {
    top: number | (() => number);
    left: number | (() => number);
  };
  hangLeft?: boolean;
  extraRound?: boolean;
  options: IOption<V>[];
  optionListClassName?: string;
  trigger?: (props: TriggerProps) => React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

export const OptionMenu = React.forwardRef<HTMLDivElement | null, OptionMenuProps>(({
  optionMenuSize = ControlSizes.S,
  stopPropagation = false,
  open,
  portal,
  options,
  extraRound,
  className,
  optionListClassName,
  portalScrollParent,
  portalScroll,
  hangLeft: hangLeftProp,
  placement = 'overlay',
  trigger,
  onOpen,
  onClose,
  children,
  ...props
}, ref) => {
  const OptionMenuRef = React.useRef<HTMLDivElement | null>(null);
  const optionListRef = React.useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [hangLeft, setHangLeft] = React.useState(false);
  const [boundingClientRect, setBoundingClientRet] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => OptionMenuRef.current);

  const isOpenValue = React.useMemo(() => {
    if (typeof open === 'boolean') return open;
    return isOpen;
  }, [open, isOpen]);

  const handleWindowClick = React.useCallback((event: Event) => {
    if (
      isOpenValue
      && optionListRef.current
      && (!(event.target instanceof Node) || !optionListRef.current.contains(event.target as any))
    ) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  }, [isOpenValue, onClose]);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = OptionMenuRef.current?.getBoundingClientRect();
    console.log('rect', rect);
    if (stopPropagation) {
      event.stopPropagation();
      window.dispatchEvent(new Event('click'));
    }
    setIsOpen(!isOpenValue);
    if (rect) {
      setHangLeft(window.innerWidth < (rect.x + rect.width + 20));
      setBoundingClientRet(rect);
    }
    if (isOpenValue && onClose) onClose();
    else if (!isOpenValue && onOpen) onOpen();
  }, [stopPropagation, isOpenValue, portal, boundingClientRect, onOpen, onClose]);

  const handleOptionClick = React.useCallback((opt: IOption) => {
    setIsOpen(false);
    if (opt.onClick) opt.onClick(opt.value);
    if (onClose) onClose();
  }, [onClose]);

  const handleWindowResize = React.useCallback((event: Event) => {
    if (isOpenValue) {
      setIsOpen(false);
    }
  }, [isOpenValue]);

  const triggerElement = React.useMemo(() => {
    if (trigger) {
      return trigger({
        on: isOpenValue,
        extraRound: extraRound,
        buttonSize: optionMenuSize,
        onClick: handleClick,
      })
    }

    return (
      <IconButton
        on={isOpenValue}
        extraRound={extraRound}
        buttonSize={optionMenuSize}
        onClick={handleClick}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3 7.5C3 8.328 2.328 9 1.5 9C0.672 9 0 8.328 0 7.5C0 6.672 0.672 6 1.5 6C2.328 6 3 6.672 3 7.5ZM9 7.5C9 8.328 8.328 9 7.5 9C6.672 9 6 8.328 6 7.5C6 6.672 6.672 6 7.5 6C8.328 6 9 6.672 9 7.5ZM13.5 9C14.328 9 15 8.328 15 7.5C15 6.672 14.328 6 13.5 6C12.672 6 12 6.672 12 7.5C12 8.328 12.672 9 13.5 9Z" />
        </svg>
      </IconButton>
    )
  }, [trigger, isOpenValue, extraRound, optionMenuSize, handleClick]);

  const optionsList = React.useMemo(() => {
    const s_top = portalScroll
      ? (typeof portalScroll.top === 'number' ? portalScroll.top : portalScroll.top())
      : (portalScrollParent ? portalScrollParent.scrollTop : document.body.scrollTop || document.documentElement.scrollTop);
    const s_left = portalScroll
      ? (typeof portalScroll.left === 'number' ? portalScroll.left : portalScroll.left())
      : (portalScrollParent ? portalScrollParent.scrollLeft : document.body.scrollLeft || document.documentElement.scrollLeft);

    return (
      <ul
        ref={optionListRef}
        className={cx(
          styles.optionList,
          optionListClassName,
          styles[optionMenuSize],
          isOpenValue && styles.isOpen,
          (typeof hangLeftProp !== 'undefined' && hangLeftProp !== null ? hangLeftProp : hangLeft) && styles.hangLeft
        )}
        style={{
          ...((portal && boundingClientRect) ? {
            top: `${s_top + boundingClientRect.top}px`,
            left: `${s_left + boundingClientRect.left}px`,
            minWidth: `${boundingClientRect.width}px`,
          } : {}),
          ...(placement === 'below' ? {
            transform: `translateY(${(boundingClientRect?.height ?? 0) + 4}px)`
          } : {}),
        }}
      >
        {options.map(({ icon: Icon, ...opt }) => (
          <li
            key={opt.label}
            className={styles.option}
            onClick={(event: React.SyntheticEvent<HTMLLIElement>) => {
              if (stopPropagation) {
                event.stopPropagation();
              }
              handleOptionClick(opt);
            }}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    );
  }, [isOpenValue, placement, stopPropagation, options, portal, hangLeftProp, portalScroll, portalScrollParent, optionMenuSize, optionListClassName, hangLeft, boundingClientRect, handleOptionClick]);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);
  React.useEffect(() => {
    if (isOpenValue) {
      window.requestAnimationFrame(() => (
        window.addEventListener('click', handleWindowClick)
      ));
    }
    return () => {
      window.requestAnimationFrame(() => {
        window.removeEventListener('click', handleWindowClick);
      });
    };
  }, [isOpenValue, handleWindowClick]);


  return (
    <div
      {...props}
      ref={OptionMenuRef}
      className={cx(
        className,
        styles.optionMenu,
        !!extraRound && styles.extraRound,
      )}
    >
      {triggerElement}
      {isOpenValue && (
        portal ? (
          <Portal node={portal === true ? document.body : portal}>
            {optionsList}
          </Portal>
        ) : (
          optionsList
        )
      )}
    </div>
  );
}) as <V = any>(
  props: OptionMenuProps<V> & { ref?: React.ForwardedRef<HTMLDivElement | null> }
) => React.ReactElement<any, any> | null;
