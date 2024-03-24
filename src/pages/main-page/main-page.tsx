import { useEffect } from 'react';
import styles from './main-page.module.css';

import { Menu } from './menu/menu';
import { PageContainer } from './page-container/page-container';
import { getUserRequest } from '@app/api/user';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '@redux/user/reducer';

export const MainPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getUserRequest().then((profile) => dispatch(setUserProfile(profile))), [];
    });
    return (
        <div className={styles.wrapper}>
            <Menu />
            <PageContainer />
        </div>
    );
};
