// import React from 'react';
import styles from './pageContainer.module.css';
import { Header } from './header';
import { Section } from './section';
// import classnames from 'classnames';

interface Props {
    collapsed: boolean;
}

export const PageContainer = ({ collapsed }: Props) => {
    return (
        <div className={!collapsed ? styles.wrapperFull : styles.wrapper}>
            <Header />
            <Section />
        </div>
    );
};
