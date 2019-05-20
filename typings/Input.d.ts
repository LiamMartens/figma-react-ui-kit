import * as React from 'react';
import { ControlSizes } from 'constants';

export interface IInputProps extends
    React.HTMLAttributes<HTMLInputElement> {
    size?: ControlSizes;
}