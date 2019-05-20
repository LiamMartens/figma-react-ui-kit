import * as React from 'react';
import * as styles from 'src/scss/components/Checkbox.scss';
import classNames from 'classnames';
import { ControlSizes } from 'constants';
import { ICheckboxProps } from 'typings/Checkbox';

export class Checkbox extends React.Component<ICheckboxProps> {
    public static defaultProps = {
        size: ControlSizes.S,
        label: '',
    }

    public render() {
        const { label, size, ...rest } = this.props;

        return (
            <label className={classNames({
                [styles.checkbox]: true,
                [styles[size]]: true,
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