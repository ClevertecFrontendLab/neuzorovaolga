import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';
import { useNavigate } from 'react-router-dom';

export const ErrorLoginPage = () => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate('/auth');
    };
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='warning'
                title='Вход не выполнен'
                message='Что-то пошло не так. Попробуйте еще раз'
                buttonText='Повторить'
                handleButton={handleButton}
                dataTestId='login-retry-button'
            />
        </ScreenWrapper>
    );
};
