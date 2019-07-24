import * as React from 'react';

export interface ITab {
    id: string;
    label: string;
    view: React.ComponentType<{}> | React.FunctionComponent<{}>;
    icon?: React.ReactType;
}

export interface ITabsProps extends React.HTMLAttributes<HTMLDivElement> {
    tabs: ITab[];
    defaultTab?: string;
    onSwitch?: (tab: ITab) => void;
}