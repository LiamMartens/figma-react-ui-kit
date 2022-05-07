import React from 'react';
import styles from './Button.module.scss';
import cx from 'classnames';
import { ControlSizes, ButtonTypes } from '../../constants';

export type ButtonProps = React.PropsWithChildren<
  React.BaseHTMLAttributes<HTMLButtonElement> & {
    buttonSize?: ControlSizes;
    buttonType?: ButtonTypes;
    extraRound?: boolean;
  }
>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  buttonSize = ControlSizes.S,
  buttonType = ButtonTypes.PRIMARY,
  extraRound = false,
  children,
  className,
  ...props
}, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={cx(
        className,
        styles.button,
        styles[buttonSize],
        styles[buttonType],
        !!extraRound && styles.extraRound,
      )}
    >
      {children}
    </button>
  )
});
