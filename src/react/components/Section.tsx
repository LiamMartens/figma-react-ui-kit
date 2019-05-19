import * as React from 'react';
import * as styles from '../../scss/components/Section.scss';
import classNames from 'classnames';

export class Section extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    public render() {
        const { children, className, ...rest } = this.props;

        return (
            <div
                {...rest}
                className={classNames({
                    [styles.section]: true,
                    [className]: !!className,
                })}
            >
                {children}
            </div>
        );
    }
}