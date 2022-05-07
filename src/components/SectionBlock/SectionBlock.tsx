import React from 'react';
import styles from './SectionBlock.module.scss';
import cx from 'classnames';

export type SectionBlockProps = React.HTMLAttributes<HTMLDivElement>;

export const SectionBlock = React.forwardRef<HTMLDivElement, SectionBlockProps>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        styles.sectionBlock
      )}
    >
      {children}
    </div>
  )
});
