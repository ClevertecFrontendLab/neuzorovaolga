import React from 'react';
import styles from './menuItem.module.css';
import useWindowDimensions from '@hooks/useWindowDimensions.ts';

interface Props {
    icon: React.ReactNode;
    label: string;
    collapsed: boolean;
}

export const MenuItem = ({ icon, label, collapsed }: Props) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 833;
    return (
        <div className={collapsed ? styles.itemCollapsed : styles.item}>
            {!isMobile && icon}
            <p className={collapsed ? styles.itemLabelCollapsed : styles.itemLabel}>{label}</p>
        </div>
    );
};
