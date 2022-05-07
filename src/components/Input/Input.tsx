import React from 'react';
import styles from './Input.module.scss';
import cx from 'classnames';
import { ControlSizes } from '../../constants';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: ControlSizes;
  inlineLabel?: string | React.ReactNode;
  cleanBorder?: boolean;
  extraRound?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  inlineLabel = '',
  cleanBorder = false,
  extraRound = false,
  inputSize = ControlSizes.S,
  style,
  className,
  children,
  ...props
}, ref) => {
  const [inlineLabelSize, setInlineLabelSize] = React.useState(0);

  const handleInlineLabelRef = React.useCallback((el?: HTMLSpanElement | null) => {
    if (el) {
      setInlineLabelSize(el.offsetWidth);
    }
  }, []);

  return (
    <label className={cx(styles.wrap, className)}>
      <input
        {...props}
        ref={ref}
        style={{
          ...style,
          paddingLeft: !!inlineLabel ? `calc(0.857em * 2 + ${inlineLabelSize}px)` : '',
        }}
        className={cx(
          styles.input,
          [styles[inputSize]],
          !!cleanBorder && styles.cleanBorder,
          !!extraRound && styles.extraRound,
        )}
      />
      {inlineLabel && (
        <span
          ref={handleInlineLabelRef}
          className={cx(styles.inlineLabel, [styles[inputSize]])}
        >
          {inlineLabel}
        </span>
      )}
    </label>
  );
});
