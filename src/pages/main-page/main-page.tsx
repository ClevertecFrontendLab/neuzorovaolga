import React from 'react';
import styles from './main-page.module.css';

import { Menu } from './menu/menu';
import { PageContainer } from './page-container/page-container';

export const MainPage: React.FC = () => (
    <div className={styles.wrapper}>
        <Menu />
        <PageContainer />
    </div>
);
