import * as React from 'react';
import * as styles from 'src/scss/components/Textarea.scss';
import classNames from 'classnames';
import { ControlSizes } from 'constants';
import { ITextareaProps } from 'typings/Textarea';

export class Textarea extends React.Component<ITextareaProps> {
    public static defaultProps = {
        size: ControlSizes.M,
    };

    public render() {
        const { children, size, className, ...rest } = this.props;

        return (
            <textarea
                {...rest}
                className={classNames({
                    [styles.input]: true,
                    [styles[size]]: true,
                    [className]: !!className
                })}
            >{children}</textarea>
        );
    }
}