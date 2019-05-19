import * as React from 'react';
import * as styles from '../../scss/components/Textarea.scss';
import { ControlSizes } from '../constants';
import classNames from 'classnames';

interface IProps extends
    React.HTMLAttributes<HTMLTextAreaElement> {
    size?: ControlSizes;
}

export class Textarea extends React.Component<IProps> {
    public static defaultProps = {
        size: ControlSizes.M,
    };

    public render() {
        const { children, size, className, ...rest } = this.props;

        return (
            <textarea
                {...rest}
                className={classNames({
                    [styles.input]: true,
                    [styles[size]]: true,
                    [className]: !!className
                })}
            >{children}</textarea>
        );
    }
}