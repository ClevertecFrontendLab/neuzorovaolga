import React from 'react';
import styles from './cardAction.module.css';

import { Button } from 'antd';

interface Props {
    icon: React.ReactNode;
    iconTitle: string;
    title: string;
}

export const CardAction = ({ icon, iconTitle, title }: Props) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>{title}</p>
            <Button className={styles.button} type='link' icon={icon}>
                {iconTitle}
            </Button>
        </div>
    );
};
