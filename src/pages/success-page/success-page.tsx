import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../router';

export const SuccessPage = () => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate(PATH.AUTH);
    };
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='success'
                title='Регистрация успешна'
                message='Регистрация прошла успешно. Зайдите
                в приложение, используя свои e-mail и пароль'
                buttonText='Войти'
                handleButton={handleButton}
                dataTestId='registration-enter-button'
            />
        </ScreenWrapper>
    );
};
