import React, { useContext, useState } from 'react';
import FullLogoSrc from './../../../assets/img/Logo.png';
import ShortLogoSrc from './../../../assets/img/ShortLogo.png';
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
import { MenuItem } from '@pages/mainPage/menu/menuItem';
import ExitSrc from '../../../assets/img/Vector.png';
import { GlobalStateContext } from './../../../context/GlobalStateProvider';

export const Menu: React.FC = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 833;
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
                    {!collapsed && (
                        <img
                            className={collapsed ? styles.hideLogo : styles.showLogo}
                            src={FullLogoSrc}
                        />
                    )}
                    {collapsed && (
                        <img
                            className={collapsed && !isMobile ? styles.showLogo : styles.hideLogo}
                            src={ShortLogoSrc}
                        />
                    )}
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
