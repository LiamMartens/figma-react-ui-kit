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
    portal?: HTMLElement | true;
    portalScrollParent?: HTMLElement;
    hangLeft?: boolean;
    extraRound?: boolean;
    options: IOption<V>[];
    optionListClassName?: string;
    onOpen?: () => void;
    onClose?: () => void;
}
