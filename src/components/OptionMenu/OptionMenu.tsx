import React from 'react';
import styles from './OptionMenu.module.scss';
import cx from 'classnames';
import { IconButton } from '../IconButton';
import { ControlSizes } from '../../constants';
import { Portal } from 'react-portal';
import { useFloating, shift, autoUpdate, offset, Placement } from '@floating-ui/react-dom';

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
  placement?: Placement;
  overlayTrigger?: boolean;
  stopPropagation?: boolean;
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
  overlayTrigger = true,
  open,
  options,
  extraRound,
  className,
  optionListClassName,
  placement,
  trigger,
  onOpen,
  onClose,
  children,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {x, y, strategy, reference, floating, refs} = useFloating({
    placement: placement || 'bottom-start',
    middleware: overlayTrigger ? [shift()] : [shift(), offset(4)],
    whileElementsMounted: autoUpdate,
  });

  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => (
    refs.reference.current as (HTMLDivElement | null)
  ));

  const isOpenValue = React.useMemo(() => {
    if (typeof open === 'boolean') return open;
    return isOpen;
  }, [open, isOpen]);

  const handleWindowClick = React.useCallback((event: Event) => {
    if (
      isOpenValue
      && refs.floating.current
      && (!(event.target instanceof Node) || !refs.floating.current.contains(event.target as any))
    ) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  }, [isOpenValue, onClose]);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.stopPropagation();
      window.dispatchEvent(new Event('click'));
    }
    setIsOpen(!isOpenValue);
    if (isOpenValue && onClose) onClose();
    else if (!isOpenValue && onOpen) onOpen();
  }, [stopPropagation, isOpenValue, onOpen, onClose]);

  const handleOptionClick = React.useCallback((opt: IOption) => {
    setIsOpen(false);
    if (opt.onClick) opt.onClick(opt.value);
    if (onClose) onClose();
  }, [onClose]);

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
    return (
      <ul
        ref={floating}
        className={cx(
          styles.optionList,
          optionListClassName,
          styles[optionMenuSize],
          isOpenValue && styles.isOpen,
        )}
        style={{
          position: strategy,
          top: y ?? '',
          left: x ?? '',
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
  }, [x, y, strategy, floating, isOpenValue, placement, stopPropagation, options, optionMenuSize, optionListClassName, handleOptionClick]);

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
      ref={overlayTrigger ? undefined : reference}
      className={cx(
        className,
        styles.optionMenu,
        !!extraRound && styles.extraRound,
      )}
    >
      {overlayTrigger && <div ref={reference} />}
      {triggerElement}
      {isOpenValue && (
        <Portal>
          {optionsList}
        </Portal>
      )}
    </div>
  );
}) as <V = any>(
  props: OptionMenuProps<V> & { ref?: React.ForwardedRef<HTMLDivElement | null> }
) => React.ReactElement<any, any> | null;
