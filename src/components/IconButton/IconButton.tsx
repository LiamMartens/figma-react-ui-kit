import React from 'react';
import styles from './IconButton.module.scss';
import cx from 'classnames';
import { ControlSizes } from '../../constants';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonSize?: ControlSizes;
  on?: boolean;
  extraRound?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  buttonSize = ControlSizes.S,
  on = false,
  extraRound = false,
  className,
  children,
  ...props
}, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={cx(
        className,
        styles.iconButton,
        styles[buttonSize],
        !!on && styles.on,
        !!extraRound && styles.extraRound,
      )}
    >
      {children}
    </button>
  )
});