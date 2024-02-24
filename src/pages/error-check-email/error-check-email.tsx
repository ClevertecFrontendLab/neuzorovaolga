import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import EmailErrorIcon from './../../assets/img/email-error.png';
import styles from './error-check-email.module.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
import { PATH } from '../../router';

export const ErrorCheckEmailPage = () => {
    const navigate = useNavigate();
    const { changeRepeatedRequest } = useContext(AuthContext);

    const handleButton = () => {
        changeRepeatedRequest(true);
        navigate(PATH.AUTH);
    };
    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                <img src={EmailErrorIcon} />
                <div className={styles.title}>Что-то пошло не так</div>
                <div className={styles.message}>
                    Произошла ошибка, попробуйте отправить форму еще раз
                </div>
                <Button type='primary' size='large' onClick={handleButton}>
                    Назад
                </Button>
            </div>
        </ScreenWrapper>
    );
};
