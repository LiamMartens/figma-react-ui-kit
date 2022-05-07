import React from 'react';
import styles from './InputLabel.module.scss';
import cx from 'classnames';

export type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <label
      {...props}
      ref={ref}
      className={cx(
        styles.inputLabel,
        className,
      )}
    >
      {children}
    </label>
  )
});
