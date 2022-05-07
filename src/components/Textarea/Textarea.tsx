import * as React from 'react';
import * as styles from './Textarea.module.scss';
import cx from 'classnames';
import { ControlSizes } from '../../constants';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textareaSize?: ControlSizes;
  extraRound?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  textareaSize = ControlSizes.S,
  children,
  extraRound,
  className,
  ...props
}, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className={cx(
        className,
        styles.textarea,
        styles[textareaSize],
        !!extraRound && styles.extraRound,
      )}
    >
      {children}
    </textarea>
  );
});
