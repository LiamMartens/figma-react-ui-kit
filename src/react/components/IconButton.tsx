import * as React from 'react';
import * as styles from 'src/scss/components/IconButton.scss';
import classNames from 'classnames';
import { IIconButtonProps } from 'typings/IconButton';
import { ControlSizes } from 'constants';

export class IconButton extends React.Component<IIconButtonProps> {
    public static defaultProps = {
        buttonSize: ControlSizes.S,
    };

    public render() {
        const { children, buttonSize, className, ...rest } = this.props;

        return (
            <button
                {...rest}
                className={classNames({
                    [styles.iconButton]: true,
                    [styles[buttonSize]]: true,
                    [className]: !!className
                })}
            >
                {children}
            </button>
        );
    }
}