import * as React from 'react';
import { ControlSizes, ButtonTypes } from '../constants';

export interface IButtonProps extends
    React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonSize?: ControlSizes;
    buttonType?: ButtonTypes;
    extraRound?: boolean;
}