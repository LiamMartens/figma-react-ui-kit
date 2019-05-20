import * as React from 'react';
import { ControlSizes } from 'constants';

export interface IInputProps extends
    React.InputHTMLAttributes<HTMLInputElement> {
    inputSize?: ControlSizes;
}