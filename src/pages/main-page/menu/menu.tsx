import React, { useContext, useState } from 'react';
import FullLogoSrc from './../../../assets/img/logo.png';
import ShortLogoSrc from './../../../assets/img/short-logo.png';
import styles from './menu.module.css';
import 'antd/dist/antd.css';

import {
    CalendarTwoTone,
    HeartFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SolutionOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import useWindowDimensions from '@hooks/useWindowDimensions.ts';
import { MenuItem } from '@pages/main-page/menu/menu-item/menu-item';
import ExitSrc from '../../../assets/img/vector.png';
import { GlobalStateContext } from '../../../context/GlobalStateProvider';

export const Menu: React.FC = () => {
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;
    const { collapsed, showMenu, hideMenu } = useContext(GlobalStateContext);

    const actionButtons = [
        {
            key: '1',
            icon: (
                <CalendarTwoTone
                    twoToneColor='#061178'
                    style={{
                        color: '#061178',
                    }}
                />
            ),
            label: 'Календарь',
        },
        {
            key: '2',
            icon: (
                <HeartFilled
                    style={{
                        color: '#061178',
                    }}
                />
            ),
            label: 'Тренировки',
        },
        {
            key: '3',
            icon: (
                <TrophyFilled
                    style={{
                        color: '#061178',
                    }}
                />
            ),
            label: 'Достижения',
        },
        {
            key: '4',
            icon: (
                <SolutionOutlined
                    style={{
                        color: '#061178',
                    }}
                />
            ),
            label: 'Профиль',
        },
    ];

    return (
        <div className={styles.menuWrapper}>
            <div className={collapsed ? styles.menuContentCollapsed : styles.menuContent}>
                <div className={styles.menu}>
                    <div className={styles.logoWrapper}>
                        {!collapsed && <img className={styles.logo} src={FullLogoSrc} />}
                        {collapsed && !isMobile && (
                            <img className={styles.logo} src={ShortLogoSrc} />
                        )}
                    </div>
                    <div className={styles.tabs}>
                        {actionButtons.map(({ icon, label }) => (
                            <MenuItem icon={icon} label={label} collapsed={collapsed} />
                        ))}
                    </div>

                    <div className={styles.exitWrapper}>
                        <div className={styles.exitButtonWrapper}>
                            <MenuItem
                                icon={<img src={ExitSrc} />}
                                label='Выход'
                                collapsed={collapsed}
                            />
                        </div>
                    </div>
                </div>
                <button
                    className={styles.trigger}
                    data-test-id={!isMobile ? 'sider-switch' : 'sider-switch-mobile'}
                    onClick={collapsed ? showMenu : hideMenu}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
            </div>
        </div>
    );
};