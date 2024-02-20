import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import EmailErrorIcon from './../../assets/img/email-error.png';
import styles from './error-check-email.module.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';

export const ErrorCheckEmailPage = () => {
    const { changeRepeatedRequest } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleButton = () => {
        changeRepeatedRequest(true);
        navigate('/auth');
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
