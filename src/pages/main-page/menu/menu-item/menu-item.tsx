import React from 'react';
import styles from './menu-item.module.css';
import useWindowDimensions from '@hooks/useWindowDimensions.ts';

type Props = {
    icon: React.ReactNode;
    label: string;
    collapsed: boolean;
    handleClick?: () => void;
    key?: string;
};

export const MenuItem = ({ icon, label, collapsed, handleClick }: Props) => {
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    return (
        <div className={collapsed ? styles.itemCollapsed : styles.item} onClick={handleClick}>
            {!isMobile && icon}
            {!collapsed && <p className={styles.itemLabel}>{label}</p>}
        </div>
    );
};
