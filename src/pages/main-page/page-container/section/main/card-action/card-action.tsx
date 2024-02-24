import React, { useContext } from 'react';
import styles from './card-action.module.css';

import { Button } from 'antd';
import { GlobalContext } from '../../../../../../context/GlobalContext';
import useWindowDimensions from '@hooks/useWindowDimensions';

interface Props {
    icon: React.ReactNode;
    iconTitle: string;
    title: string;
}

export const CardAction = ({ icon, iconTitle, title }: Props) => {
    const { width } = useWindowDimensions();
    const isTablet = width < 1440 && width > 833;
    const { collapsed } = useContext(GlobalContext);
    return (
        <div className={collapsed && isTablet ? styles.wrapperShort : styles.wrapper}>
            <p className={collapsed && isTablet ? styles.textShort : styles.text}>{title}</p>

            <Button
                className={collapsed && isTablet ? styles.button : ''}
                type='link'
                icon={icon}
                style={{
                    color: '#2f54eb',
                }}
            >
                {iconTitle}
            </Button>
        </div>
    );
};
