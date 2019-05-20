import * as React from 'react';
import { ControlSizes, ButtonTypes } from '../constants';

export interface IButtonProps extends
    React.HTMLAttributes<HTMLButtonElement> {
    size?: ControlSizes;
    buttonType?: ButtonTypes;
}