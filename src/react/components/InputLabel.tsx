import * as React from 'react';
import * as styles from 'src/scss/components/InputLabel.scss';
import classNames from 'classnames';
import { IInputLabelProps } from 'typings/InputLabel';

export class InputLabel extends React.Component<IInputLabelProps> {
    public render() {
        const { className, children, ...rest } = this.props;

        return (
            <label
                {...rest}
                className={classNames({
                    [styles.inputLabel]: true,
                    [className]: !!className,
                })}
            >
                {children}
            </label>
        )
    }
}