import * as React from 'react';
import { ControlSizes } from 'constants';

export interface ICheckboxProps extends
    React.HTMLAttributes<HTMLInputElement> {
    size?: ControlSizes;
    label?: string;
}