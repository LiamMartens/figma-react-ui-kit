import * as React from 'react';
import { ControlSizes } from 'constants';

export interface IOption<V = any> {
    label: string;
    value: V;
    onClick: (val: V) => void;
}

export interface IOptionMenuProps<V = any> extends
    React.HTMLAttributes<HTMLDivElement> {
    optionMenuSize?: ControlSizes;
    stopPropagation?: boolean;
    hangLeft?: boolean;
    options: IOption<V>[];
    onOpen?: () => void;
    onClose?: () => void;
}
