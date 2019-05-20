import * as React from 'react';
import { ControlSizes } from 'constants';

export interface ICheckboxProps extends
    React.InputHTMLAttributes<HTMLInputElement> {
    checkboxSize?: ControlSizes;
    label?: string;
}