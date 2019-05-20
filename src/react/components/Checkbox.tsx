import * as React from 'react';
import * as styles from 'src/scss/components/Checkbox.scss';
import classNames from 'classnames';
import { ControlSizes } from 'constants';
import { ICheckboxProps } from 'typings/Checkbox';

export class Checkbox extends React.Component<ICheckboxProps> {
    public static defaultProps = {
        checkboxSize: ControlSizes.S,
        label: '',
    }

    public render() {
        const { label, checkboxSize, ...rest } = this.props;

        return (
            <label className={classNames({
                [styles.checkbox]: true,
                [styles[checkboxSize]]: true,
            })}>
                <input
                    {...rest}
                    className={styles.input}
                    type="checkbox"
                />
                <span className={styles.label}>{label}</span>
            </label>
        );
    }
}