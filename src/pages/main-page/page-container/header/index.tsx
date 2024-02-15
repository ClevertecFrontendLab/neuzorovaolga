import React, { useContext } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import { Space } from 'antd';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { GlobalStateContext } from '../../../../context/GlobalStateProvider';

export const Header: React.FC = () => {
    const { width } = useWindowDimensions();
    const isTablet = width < 1440 && width > 833;
    const { collapsed } = useContext(GlobalStateContext);

    return (
        <div className={isTablet && collapsed ? styles.wrapperShort : styles.wrapper}>
            <button className={styles.mainButton}>Главная</button>
            <div className={isTablet && collapsed ? styles.titleShort : styles.title}>
                {!collapsed && (
                    <h1>
                        Приветствуем тебя в CleverFit — приложении,
                        <br /> которое поможет тебе добиться своей мечты!
                    </h1>
                )}
                {collapsed && !isTablet && (
                    <h1>
                        Приветствуем тебя в CleverFit — приложении,
                        <br /> которое поможет тебе добиться своей мечты!
                    </h1>
                )}
                {isTablet && collapsed && (
                    <h1>
                        Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться
                        своей мечты!
                    </h1>
                )}
                {width >= 834 ? (
                    <button className={styles.settingsButton}>
                        <Space className={styles.icon}>
                            <SettingOutlined />
                        </Space>
                        Настройки
                    </button>
                ) : (
                    <button className={styles.settingsButtonMobile}>
                        <SettingOutlined />
                    </button>
                )}
            </div>
        </div>
    );
};
