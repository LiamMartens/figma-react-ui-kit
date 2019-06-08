import * as React from 'react';
import * as styles from 'src/scss/components/Textarea.scss';
import classNames from 'classnames';
import { ControlSizes } from 'constants';
import { ITextareaProps } from 'typings/Textarea';

export class Textarea extends React.Component<ITextareaProps> {
    public static defaultProps = {
        textareaSize: ControlSizes.S
    };

    public render() {
        const { children, textareaSize, className, ...rest } = this.props;

        return (
            <textarea
                {...rest}
                className={classNames({
                    [styles.textarea]: true,
                    [styles[textareaSize]]: true,
                    [className]: !!className
                })}
            >{children}</textarea>
        );
    }
}