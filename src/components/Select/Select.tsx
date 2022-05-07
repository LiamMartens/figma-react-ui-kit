import React from 'react';
import styles from './Select.module.scss';
import cx from 'classnames';
import { ControlSizes } from '../../constants';
import { Portal } from 'react-portal';

export interface ISelectOption {
  value: string;
  label: string;
  selected?: boolean;
  icon?: React.ReactNode;
}

export type SelectProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  open?: boolean;
  value?: string;
  defaultValue?: string;
  selectSize?: ControlSizes;
  cleanBorder?: boolean;
  stopPropagation?: boolean;
  portal?: HTMLElement | true;
  portalScrollParent?: HTMLElement;
  portalScroll?: {
    top: number | (() => number);
    left: number | (() => number);
  };
  maxHeight?: string | number;
  optionListWidth?: string | number;
  optionListClassName?: string;
  extraRound?: boolean;
  options: ISelectOption[];
  onOpen?: () => void;
  onClose?: () => void;
  onChange?: (option: ISelectOption) => void;
}

export const Select = React.forwardRef<HTMLDivElement | null, SelectProps>(({
  selectSize = ControlSizes.S,
  cleanBorder = false,
  defaultValue,
  value: valueProp,
  open: openProp,
  stopPropagation,
  portal,
  options,
  onOpen,
  onClose,
  onChange,
  portalScroll,
  portalScrollParent,
  maxHeight,
  optionListWidth,
  className,
  optionListClassName,
  extraRound,
  placeholder,
  ...props
}, ref) => {
  const SelectRef = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [boundingClientRect, setBoundingClientRect] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>();
  const [value, setValue] = React.useState(typeof valueProp === 'undefined' ? defaultValue : valueProp);

  const isOpenValue = React.useMemo(() => {
    if (typeof openProp === 'boolean')
      return openProp;
    return isOpen;
  }, [openProp, isOpen]);

  const selectedOption = React.useMemo(() => {
    const currentValue = value || valueProp || defaultValue;
    return options.find(o => o.value === currentValue);
  }, [defaultValue, options]);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (stopPropagation) event.stopPropagation();
    if (
      !listRef.current
      || !listRef.current.contains(event.target as any)
    ) {
      setIsOpen(true);
      setBoundingClientRect(portal ? event.currentTarget.getBoundingClientRect() : null);
    }
  }, [stopPropagation, portal, onOpen, listRef]);

  const handleOptionClick = React.useCallback((opt: ISelectOption) => {
    setIsOpen(false);
    if (value === undefined) setValue(opt.value);
    if (onChange) onChange(opt);
    if (onClose) onClose();
  }, [valueProp, onChange, onClose]);

  const handleWindowClick = React.useCallback((event: Event) => {
    if (
      isOpenValue
      && listRef.current
      && (!(event.target instanceof Node) || !listRef.current.contains(event.target as any))) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  }, [isOpenValue, onClose]);

  const handleWindowResize = React.useCallback((event: Event) => {
    if (isOpenValue) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  }, [isOpenValue, onClose]);

  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => SelectRef.current);
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
  React.useEffect(() => {
    if (typeof valueProp !== 'undefined') {
      setValue(valueProp);
    }
  }, [valueProp]);

  const optionsList = React.useMemo(() => {
    const s_top = portalScroll
      ? (typeof portalScroll.top === 'number' ? portalScroll.top : portalScroll.top())
      : (portalScrollParent ? portalScrollParent.scrollTop : document.body.scrollTop || document.documentElement.scrollTop);
    const s_left = portalScroll
      ? (typeof portalScroll.left === 'number' ? portalScroll.left : portalScroll.left())
      : (portalScrollParent ? portalScrollParent.scrollLeft : document.body.scrollLeft || document.documentElement.scrollLeft);

    return (
      <ul
        ref={listRef}
        className={cx(
          [styles[selectSize]],
          styles.optionsList,
          optionListClassName,
          !!portal && styles.portaled
        )}
        style={{
          ...(maxHeight ? {
            maxHeight: typeof maxHeight === 'number'
              ? `${maxHeight}px`
              : maxHeight
          } : {}),
          ...(optionListWidth ? {
            width: typeof optionListWidth === 'number'
              ? `${optionListWidth}px`
              : optionListWidth
          } : {}),
          ...((portal && boundingClientRect) ? {
            top: `${s_top + boundingClientRect.top}px`,
            left: `${s_left + boundingClientRect.left}px`,
            minWidth: `${boundingClientRect.width}px`,
          } : {}),
        }}
      >
        {options.map(o => (
          <li key={o.value} className={styles.option} onClick={() => handleOptionClick(o)}>
            {selectedOption && selectedOption.value === o.value && (
              <svg
                className={styles.checkmark}
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.207 5.207L7 11.414 3.292 7.707l1.415-1.414L7 8.586l4.793-4.793 1.414 1.414z" />
              </svg>
            )}
            <span className={styles.label}>{o.label}</span>
          </li>
        ))}
      </ul>
    );
  }, [listRef, selectedOption, portal, portalScroll, portalScrollParent, boundingClientRect, handleOptionClick]);

  return (
    <div
      {...props}
      ref={SelectRef}
      onClick={handleClick}
      className={cx(
        className,
        styles.select,
        styles[selectSize],
        isOpen && styles.focus,
        !!extraRound && styles.extraRound,
        !!cleanBorder && styles.cleanBorder,
      )}
    >
      {!selectedOption ? (
        <span className={styles.placeholder}>{placeholder}</span>
      ) : (
        <span className={styles.value}>
          <span className={styles.icon}>
            {!!selectedOption.icon && (
              selectedOption.icon
            )}
          </span>
          <span className={styles.label}>{selectedOption.label}</span>
        </span>
      )}

      <svg
        className={styles.arrow}
        width="8"
        height="7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3.646 5.354l-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707l-.354-.353z" fillRule="evenodd" />
      </svg>

      {isOpen && (
        portal ? (
          <Portal node={portal === true ? document.body : portal}>
            {optionsList}
          </Portal>
        ) : (
          optionsList
        )
      )}
    </div>
  )
});
