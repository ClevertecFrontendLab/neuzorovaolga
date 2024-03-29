import styles from './main-page.module.css';

import { Menu } from './menu/menu';
import { PageContainer } from './page-container/page-container';

export const MainPage = () => {
    return (
        <div className={styles.wrapper}>
            <Menu />
            <PageContainer />
        </div>
    );
};
