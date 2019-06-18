import * as React from 'react';
import { ControlSizes } from 'constants';

export interface IIconButtonProps extends
    React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonSize?: ControlSizes;
    on?: boolean;
    extraRound?: boolean;
}