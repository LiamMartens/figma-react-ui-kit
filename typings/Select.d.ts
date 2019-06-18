import * as React from 'react';
import { ControlSizes } from 'constants';

export interface ISelectOption {
    value: string;
    label: string;
    selected?: boolean;
    icon?: React.ReactNode;
}

export interface ISelectProps extends
    Pick<
        React.HTMLAttributes<HTMLDivElement>,
        Exclude<keyof React.HTMLAttributes<HTMLDivElement>, 'onChange'>
    > {
    value?: string;
    defaultValue?: string;
    selectSize?: ControlSizes;
    cleanBorder?: boolean;
    stopPropagation?: boolean;
    maxHeight?: string | number;
    extraRound?: boolean;
    options: ISelectOption[];
    onOpen?: () => void;
    onClose?: () => void;
    onChange?: (option: ISelectOption) => void;
}