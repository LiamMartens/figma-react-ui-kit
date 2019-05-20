import * as React from 'react';
import { ControlSizes } from 'constants';

export interface ITextareaProps extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    textareaSize?: ControlSizes;
}