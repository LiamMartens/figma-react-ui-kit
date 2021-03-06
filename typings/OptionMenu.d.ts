import * as React from 'react';
import { ControlSizes } from 'constants';

export interface IOption<V = any> {
    label: string;
    value: V;
    onClick: (val: V) => void;
}

export interface IOptionMenuProps<V = any> extends
    React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    optionMenuSize?: ControlSizes;
    stopPropagation?: boolean;
    portal?: HTMLElement | true;
    portalScrollParent?: HTMLElement;
    portalScroll?: {
        top: number | (() => number);
        left: number | (() => number);
    };
    hangLeft?: boolean;
    extraRound?: boolean;
    options: IOption<V>[];
    optionListClassName?: string;
    onOpen?: () => void;
    onClose?: () => void;
}
