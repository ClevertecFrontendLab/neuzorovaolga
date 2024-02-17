import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import EmailErrorIcon from './../../assets/img/email-error.png';
import styles from './error-check-email.module.css';
import { Button } from 'antd';

export const ErrorCheckEmailPage = () => {
    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                <img src={EmailErrorIcon} />
                <div className={styles.title}>Что-то пошло не так</div>
                <div className={styles.message}>
                    Произошла ошибка, попробуйте отправить форму еще раз
                </div>
                <Button
                    type='primary'
                    size='large'
                    onClick={() => {
                        return;
                    }}
                >
                    Назад
                </Button>
            </div>
        </ScreenWrapper>
    );
};
