import * as React from 'react';
import * as styles from 'src/scss/components/Button.scss';
import classNames from 'classnames';
import { ControlSizes, ButtonTypes } from 'constants';
import { IButtonProps } from 'typings/Button';

type PropsWithDefaults = IButtonProps & typeof Button.defaultProps;

export class Button extends React.Component<IButtonProps> {
    public static defaultProps = {
        buttonSize: ControlSizes.S,
        buttonType: ButtonTypes.PRIMARY,
    }

    public render() {
        const { children, buttonSize, buttonType, className, ...rest } = this.props as PropsWithDefaults;

        return (
            <button {...rest} className={classNames({
                [styles.button]: true,
                [styles[buttonSize]]: true,
                [styles[buttonType]]: true,
                [className]: !!className,
            })}>
                {children}
            </button>
        );
    }
}