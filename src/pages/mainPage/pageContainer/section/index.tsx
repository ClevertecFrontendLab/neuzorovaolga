import React from 'react';
import { Main } from './main/index';
import styles from './section.module.css';
import { Footer } from './footer';

export const Section: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <Main />
            <Footer />
        </div>
    );
};
