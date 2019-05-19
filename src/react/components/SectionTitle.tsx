import * as React from 'react';
import * as styles from '../../scss/components/SectionTitle.scss';
import classNames from 'classnames';

export class SectionTitle extends React.Component<React.HTMLAttributes<HTMLParagraphElement>> {
    public render() {
        const { children, className, ...rest } = this.props;

        return (
            <p
                className={classNames({
                    [styles.sectionTitle]: true,
                    [className]: !!classNames,
                })}
            >
                {children}
            </p>
        );
    }
}