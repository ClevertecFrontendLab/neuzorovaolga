import React from 'react';
import styles from './menu-item.module.css';
import useWindowDimensions from '@hooks/useWindowDimensions.ts';

type Props = {
    icon: React.ReactNode;
    label: string;
    collapsed: boolean;
    handleClick?: () => void;
    key?: string;
    testId?: string;
};

export const MenuItem = ({ icon, label, collapsed, handleClick, testId }: Props) => {
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    return (
        <div
            className={collapsed ? styles.itemCollapsed : styles.item}
            onClick={handleClick}
            data-test-id={testId}
        >
            {!isMobile && icon}
            {!collapsed && <p className={styles.itemLabel}>{label}</p>}
        </div>
    );
};
