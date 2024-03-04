import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoModal } from '@components/info-modal/info-modal.tsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PATH } from '../../router';
import styles from './error-check-email-no-exist-page.module.css';
import useWindowDimensions from '@hooks/useWindowDimensions';

export const ErrorCheckEmailNoExistPage = () => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;
    const { changeEmail } = useContext(AuthContext);

    const handleButton = () => {
        changeEmail('');
        navigate(PATH.AUTH);
    };
    return (
        <ScreenWrapper>
            <InfoModal
                iconType='error'
                title='Такой e-mail не зарегистрирован'
                message={
                    !isMobile
                        ? `Мы не нашли в базе вашего e-mail. Попробуйте
                войти с другим e-mail`
                        : `Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail`
                }
                buttonText='Попробовать снова'
                handleButton={handleButton}
                dataTestId='check-retry-button'
                wrapperStyles={styles.wrapper}
                buttonStyles={styles.button}
            />
        </ScreenWrapper>
    );
};
