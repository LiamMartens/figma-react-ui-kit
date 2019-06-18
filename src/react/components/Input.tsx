import * as React from 'react';
import * as styles from 'src/scss/components/Input.scss';
import classNames from 'classnames';
import { ControlSizes } from 'constants';
import { IInputProps } from 'typings/Input';

export class Input extends React.Component<IInputProps> {
    public static defaultProps = {
        inputSize: ControlSizes.S,
        inlineLabel: '',
        cleanBorder: false,
    };

    public render() {
        const {
            cleanBorder,
            inputSize,
            inlineLabel,
            className,
            style,
            ...rest
        } = this.props;

        return (
            <label className={classNames({
                [styles.wrap]: true,
                [className]: !!className
            })}>
                <input
                    {...rest}
                    style={{
                        ...style,
                        paddingLeft: !!inlineLabel ? `calc(0.857em + ${inlineLabel.length / 1.5}em)` : '',
                    }}
                    className={classNames({
                        [styles.input]: true,
                        [styles.cleanBorder]: cleanBorder,
                        [styles[inputSize]]: true,
                    })}
                />
                {inlineLabel && (
                    <span
                        className={classNames({
                            [styles.inlineLabel]: true,
                            [styles[inputSize]]: true,
                        })}
                        style={{
                            
                        }}
                    >
                        {inlineLabel}
                    </span>
                )}
            </label>
        );
    }
}