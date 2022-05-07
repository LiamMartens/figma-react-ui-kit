import React from 'react';
import styles from './IconButton.module.scss';
import cx from 'classnames';
import { ControlSizes } from '../../constants';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonSize?: ControlSizes;
  on?: boolean;
  extraRound?: boolean;
  muted?: boolean;
  label?: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  buttonSize = ControlSizes.S,
  on = false,
  extraRound = false,
  muted = false,
  label,
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
        !!muted && styles.muted,
        !!extraRound && styles.extraRound,
      )}
    >
      <div className={styles.content}>
        <span>
          {children}
        </span>
        {!!label && <span className={styles.label}>{label}</span>}
      </div>
    </button>
  )
});