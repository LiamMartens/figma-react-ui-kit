import * as React from 'react';
import * as styles from '../../scss/components/SectionBlock.scss';
import classNames from 'classnames';

export class SectionBlock extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    public render() {
        const { children, className, ...rest } = this.props;

        return (
            <div
                className={classNames({
                    [styles.sectionBlock]: true,
                    [className]: !!className
                })}
            >
                {children}
            </div>
        )
    }
}