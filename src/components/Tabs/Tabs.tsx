import React from 'react';
import styles from './Tabs.module.scss';
import cx from 'classnames';
import { TabsTab } from './TabsTab';

export interface ITab {
  id: string;
  label: string;
  view: React.ComponentType;
  hidden?: boolean;
  icon?: React.ComponentType;
}

export type TabsRef = {
  setCurrentTab: (tab: string) => void;
}

export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  tabs: ITab[];
  defaultTab: string;
  tabClassName?: string;
  extra?: React.ReactNode;
  onSwitch?: (tab: ITab) => void;
  onTabClick?: (tab: ITab) => void;
}

export const Tabs = React.forwardRef<TabsRef, TabsProps>(({ 
  tabs,
  onSwitch,
  onTabClick,
  defaultTab,
  tabClassName,
  extra,
  className = '',
  ...rest
}, ref) => {
  const [currentTab, setCurrentTab] = React.useState(defaultTab);

  const activeTab = React.useMemo(() => {
    return tabs.find((t, index) => (!currentTab && index === 0) || t.id === currentTab);
  }, [tabs, currentTab]);

  const onHandleTabClick = React.useCallback((tab: ITab) => {
    setCurrentTab(tab.id);
    if (onSwitch) onSwitch(tab);
    if (onTabClick) { onTabClick(tab); }
  }, [onSwitch, onTabClick]);

  const ActiveTabComponent = activeTab ? activeTab.view : undefined;

  React.useImperativeHandle(ref, () => ({
    setCurrentTab,
  }), [setCurrentTab]);

  return (
    <div
      {...rest}
      className={cx(className, styles.tabs)}
    >
      <div className={styles.tabsHeader}>
        <ul className={styles.tabsList}>
          {tabs.filter((tab) => !tab.hidden).map((tab, index) => (
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
        {(!!extra) && (
          <div className={styles.extra}>{extra}</div>
        )}
      </div>
      <div className={styles.view}>
        {ActiveTabComponent && (
          <ActiveTabComponent />
        )}
      </div>
    </div>
  );
});
