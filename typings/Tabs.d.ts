import * as React from 'react';

export interface ITab {
    id: string;
    label: string;
    view: React.ComponentType<{}>;
    icon?: React.ComponentType;
}

export interface ITabsTabProps {
    index: number;
    tab: ITab;
    currentTab: string;
    tabClassName?: string;
    onTabClick?: (tab: ITab) => void;
}

export interface ITabsProps extends React.HTMLAttributes<HTMLDivElement> {
    tabs: ITab[];
    tabClassName?: string;
    defaultTab?: string;
    onSwitch?: (tab: ITab) => void;
    onTabClick?: (tab: ITab) => void;
}