import React from 'react';
import styles from './error-page.module.css';
import WarningIcon from './../../assets/img/warning-icon.png';
import { Button } from 'antd';

export const ErrorPage = () => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.warningIcon} src={WarningIcon} />
            <div className={styles.error}>Вход не выполнен</div>
            <div className={styles.message}>Что-то пошло не так. Попробуйте еще раз</div>
            <Button type='primary' block size='large'>
                Повторить
            </Button>
        </div>
    );
};
