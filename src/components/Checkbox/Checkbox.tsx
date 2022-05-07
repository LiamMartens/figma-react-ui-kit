import React from 'react';
import styles from './Checkbox.module.scss';
import cx from 'classnames';
import { ControlSizes } from '../../constants';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  checkboxSize?: ControlSizes;
  label?: string;
  extraRound?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label = '',
  extraRound = false,
  checkboxSize = ControlSizes.S,
  className,
  ...props
}, ref) => {
  return (
    <label
      className={cx(
        className,
        styles.checkbox,
        styles[checkboxSize],
        !!extraRound && styles.extraRound
      )}
    >
      <input
        {...props}
        ref={ref}
        className={styles.input}
        type="checkbox"
      />
      <span className={styles.label}>{label}</span>
    </label>
  )
});
