import * as React from 'react';
import * as styles from 'src/scss/components/Input.scss';
import classNames from 'classnames';
import { ControlSizes } from 'constants';
import { IInputProps } from 'typings/Input';

export class Input extends React.Component<IInputProps> {
    public static defaultProps = {
        inputSize: ControlSizes.M,
    };

    public render() {
        const { inputSize, className, ...rest } = this.props;

        return (
            <input
                {...rest}
                className={classNames({
                    [styles.input]: true,
                    [styles[inputSize]]: true,
                    [className]: !!className
                })}
            />
        );
    }
}