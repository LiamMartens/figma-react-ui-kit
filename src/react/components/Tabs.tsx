import * as React from 'react';
import * as styles from 'src/scss/components/Tabs.scss';
import classNames from 'classnames';
import { ITabsProps, ITabsTabProps, ITab } from 'typings/Tabs';

export const TabsTab: React.FunctionComponent<ITabsTabProps> = ({ index, tab, currentTab, tabClassName ='', onTabClick }) => {
    const Icon = tab.icon;

    const onClick = React.useCallback((event: React.SyntheticEvent<HTMLLIElement, MouseEvent>) => {
        if (onTabClick) {
            onTabClick(tab);
        }
    }, [tab, onTabClick]);

    return (
        <li
            key={tab.id}
            onClick={onClick}
            className={classNames({
                [styles.tabEntry]: true,
                [styles.active]: (!currentTab && index === 0) || tab.id === currentTab,
                [tabClassName]: !!tabClassName,
            })}
        >
            {Icon && <Icon />}
            {tab.label}
        </li>
    )
}

export const Tabs: React.FunctionComponent<ITabsProps> = ({ tabs, onSwitch, onTabClick, defaultTab, tabClassName, className = '', ...rest }) => {
    const [currentTab, setCurrentTab] = React.useState(defaultTab);

    const activeTab = React.useMemo(() => {
        return tabs.find((t, index) => (!currentTab && index === 0) || t.id === currentTab);
    }, [tabs, currentTab]);

    const onHandleTabClick = React.useCallback((tab: ITab) => {
        setCurrentTab(tab.id);
        onSwitch(tab);
        if (onTabClick) { onTabClick(tab); }
    }, [onSwitch, onTabClick]);

    const ActiveTabComponent = activeTab ? activeTab.view : undefined;

    return (
        <div
            {...rest}
            className={classNames({
                [styles.tabs]: true,
                [className]: !!className,
            })}
        >
            <ul className={styles.tabsList}>
                {tabs.map((tab, index) => (
                    <TabsTab
                        key={tab.id}
                        index={index}
                        tab={tab}
                        currentTab={currentTab}
                        onTabClick={onHandleTabClick}
                        tabClassName={tabClassName}
                    />
                ))}
            </ul>
            <div className={styles.view}>
                {activeTab && (
                    <ActiveTabComponent />
                )}
            </div>
        </div>
    );
}
