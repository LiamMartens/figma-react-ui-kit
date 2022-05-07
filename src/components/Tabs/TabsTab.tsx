import React from 'react';
import styles from './Tabs.module.scss';
import cx from 'classnames';
import type { ITab } from './Tabs';

export type TabsTabProps = React.HTMLAttributes<HTMLDivElement> & {
  index: number;
  tab: ITab;
  currentTab: string;
  tabClassName?: string;
  onTabClick?: (tab: ITab) => void;
}

export const TabsTab = React.forwardRef<HTMLLIElement, TabsTabProps>(({ tab, currentTab, index, tabClassName, onTabClick }, ref) => {
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
      className={cx(
        tabClassName,
        styles.tabEntry,
        ((!currentTab && index === 0) || tab.id === currentTab) && styles.active,
      )}
    >
      {Icon && <Icon />}
      {tab.label}
    </li>
  )
});