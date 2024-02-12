import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import { Space } from 'antd';
import useWindowDimensions from '@hooks/useWindowDimensions';

export const Header: React.FC = () => {
    const width = useWindowDimensions();
    console.log(width);
    return (
        <div className={styles.wrapper}>
            <button className={styles.mainButton}>Главная</button>
            <div className={styles.title}>
                <h1>
                    Приветствуем тебя в CleverFit — приложении,
                    <br /> которое поможет тебе добиться своей мечты!
                </h1>
                {width.width >= 834 ? (
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
