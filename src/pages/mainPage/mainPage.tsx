import React from 'react';
import styles from './mainPage.module.css';
import 'antd/dist/antd.css';

import { Menu } from './menu';
import { PageContainer } from './pageContainer';

export const MainPage: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <Menu />
            <PageContainer />
        </div>
    );
};
