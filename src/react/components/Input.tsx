import * as React from 'react';
import * as styles from 'src/scss/components/Input.scss';
import { ControlSizes } from 'constants';
import classNames from 'classnames';
import { IInputProps } from 'typings/Input';

export class Input extends React.Component<IInputProps> {
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