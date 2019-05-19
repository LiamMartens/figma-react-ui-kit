import * as React from 'react';
import * as styles from '../../scss/components/Button.scss';
import classNames from 'classnames';
import { ControlSizes, ButtonTypes } from '../constants';

interface IProps extends
    React.HTMLAttributes<HTMLButtonElement> {
    size?: ControlSizes;
    buttonType?: ButtonTypes;
}

type PropsWithDefaults = IProps & typeof Button.defaultProps;

export class Button extends React.Component<IProps> {
    public static defaultProps = {
        size: ControlSizes.M,
        buttonType: ButtonTypes.PRIMARY,
    }

    public render() {
        const { children, size, buttonType, className, ...rest } = this.props as PropsWithDefaults;

        return (
            <button {...rest} className={classNames({
                [styles.button]: true,
                [styles[size]]: true,
                [styles[buttonType]]: true,
                [className]: !!className,
            })}>
                {children}
            </button>
        );
    }
}