import * as React from 'react';
import * as styles from 'src/scss/components/Input.scss';
import classNames from 'classnames';
import { ControlSizes } from 'constants';
import { IInputProps } from 'typings/Input';

interface IState {
    inlineLabelSize: number;
}

export class Input extends React.Component<IInputProps, IState> {
    public static defaultProps = {
        inputSize: ControlSizes.S,
        inlineLabel: '',
        cleanBorder: false,
    };

    public state = {
        inlineLabelSize: 0,
    }

    private handleInlineLabelRef = (el?: HTMLSpanElement) => {
        if (el) {
            this.setState({
                inlineLabelSize: el.offsetWidth,
            });
        }
    }

    public render() {
        const { inlineLabelSize } = this.state;
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
                        paddingLeft: !!inlineLabel ? `calc(0.857em * 2 + ${inlineLabelSize}px)` : '',
                    }}
                    className={classNames({
                        [styles.input]: true,
                        [styles.cleanBorder]: cleanBorder,
                        [styles[inputSize]]: true,
                    })}
                />
                {inlineLabel && (
                    <span
                        ref={this.handleInlineLabelRef}
                        className={classNames({
                            [styles.inlineLabel]: true,
                            [styles[inputSize]]: true,
                        })}
                    >
                        {inlineLabel}
                    </span>
                )}
            </label>
        );
    }
}