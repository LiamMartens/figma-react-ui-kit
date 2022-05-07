import React from 'react';
import styles from './Section.module.scss';
import cx from 'classnames';

export type SectionProps = React.HTMLAttributes<HTMLDivElement>;

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cx(
        styles.section,
        className,
      )}
    >
      {children}
    </div>
  )
})