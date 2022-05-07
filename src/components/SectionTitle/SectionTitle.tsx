import React from 'react';
import styles from './SectionTitle.module.scss';
import cx from 'classnames';

export type SectionTitleProps = React.HTMLAttributes<HTMLParagraphElement>;

export const SectionTitle = React.forwardRef<HTMLParagraphElement, SectionTitleProps>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={cx(
        className,
        styles.sectionTitle,
      )}
    >
      {children}
    </p>
  );
})
