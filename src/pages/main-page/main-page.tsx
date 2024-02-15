import React from 'react';
import styles from './main-page.module.css';
import 'antd/dist/antd.css';

import { Menu } from './menu/menu';
import { PageContainer } from './page-container/page-container';
// import { ErrorLoginPage } from '@pages/error-login-page/error-login-page';

export const MainPage: React.FC = () => (
    <div className={styles.wrapper}>
        <Menu />
        <PageContainer />
        {/* <ErrorLoginPage /> */}
    </div>
);
