// import React from 'react';
import styles from './pageContainer.module.css';
import { Header } from './header';
import { Section } from './section';

export const PageContainer = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Section />
        </div>
    );
};
