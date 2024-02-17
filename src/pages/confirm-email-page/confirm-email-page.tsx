import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import InfoIcon from './../../assets/img/info-icon.png';
import ErrorIcon from './../../assets/img/error-icon.png';
import styles from './confirm-email-page.module.css';
import { useState } from 'react';

export const ConfirmEmailPage = () => {
    const [email, setEmail] = useState('victorbyden@gmail.com');
    const secretCod = [
        {
            key: '1',
            number: 1,
        },
        {
            key: '2',
            number: 2,
        },
        {
            key: '3',
            number: 3,
        },
        {
            key: '4',
            number: 4,
        },
        {
            key: '5',
            number: 5,
        },
        {
            key: '6',
            number: 6,
        },
    ];
    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                <img src={InfoIcon} />
                <div className={styles.title}>
                    Введите код <br />
                    для восстановления аккаунта
                </div>
                <div className={styles.message}>
                    {`Мы отправили вам на e-mail ${email}
                    шестизначный код. Введите его в поле ниже.`}
                </div>
                <div className={styles.secretCod}>
                    {secretCod.map(({ key, number }) => (
                        <div className={styles.numberWrapper}>
                            <div className={styles.number}>{number}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.message}>Не пришло письмо? Проверьте папку Спам.</div>
            </div>
        </ScreenWrapper>
    );
};
