import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ServerErrorPage = () => {
    const { changeRepeatedRequest } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleButton = () => {
        changeRepeatedRequest(true);
        navigate('/auth/registration');
    };
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='error'
                title='Данные не сохранились'
                message={`Что-то пошло не так и ваша регистрация
                не завершилась. Попробуйте ещё раз.`}
                buttonText='Повторить'
                handleButton={handleButton}
                dataTestId='registration-retry-button'
            />
        </ScreenWrapper>
    );
};
