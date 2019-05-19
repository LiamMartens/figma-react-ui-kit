import * as React from 'react';
import * as styles from '../../scss/components/Input.scss';
import { ControlSizes } from '../constants';
import classNames from 'classnames';

interface IProps extends
    React.HTMLAttributes<HTMLInputElement> {
    size?: ControlSizes;
}

export class Input extends React.Component<IProps> {
    public static defaultProps = {
        size: ControlSizes.M,
    };

    public render() {
        const { size, className, ...rest } = this.props;

        return (
            <input
                {...rest}
                className={classNames({
                    [styles.input]: true,
                    [styles[size]]: true,
                    [className]: !!className
                })}
            />
        );
    }
}