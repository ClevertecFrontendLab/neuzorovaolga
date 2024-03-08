import React from 'react';
import styles from './menu-item.module.css';
import useWindowDimensions from '@hooks/useWindowDimensions.ts';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@app/router';

type Props = {
    icon: React.ReactNode;
    label: string;
    collapsed: boolean;
    handler?: () => void;
    key?: string;
};

export const MenuItem = ({ key, icon, label, collapsed, handler }: Props) => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    return (
        <div
            className={collapsed ? styles.itemCollapsed : styles.item}
            onClick={() => navigate(PATH.CALENDAR)}
        >
            {!isMobile && icon}
            {!collapsed && <p className={styles.itemLabel}>{label}</p>}
        </div>
    );
};
