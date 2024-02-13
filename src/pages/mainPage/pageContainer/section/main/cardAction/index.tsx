import React, { useContext } from 'react';
import styles from './cardAction.module.css';

import { Button } from 'antd';
import { GlobalStateContext } from './../../../../../../context/GlobalStateProvider';
import useWindowDimensions from '@hooks/useWindowDimensions';

interface Props {
    icon: React.ReactNode;
    iconTitle: string;
    title: string;
}

export const CardAction = ({ icon, iconTitle, title }: Props) => {
    const { width } = useWindowDimensions();
    const isTablet = width < 1440 && width > 833;
    const { collapsed } = useContext(GlobalStateContext);
    return (
        <div className={collapsed && isTablet ? styles.wrapperShort : styles.wrapper}>
            <p className={collapsed && isTablet ? styles.textShort : styles.text}>{title}</p>

            <Button className={collapsed && isTablet ? styles.button : ''} type='link' icon={icon}>
                {iconTitle}
            </Button>
        </div>
    );
};
