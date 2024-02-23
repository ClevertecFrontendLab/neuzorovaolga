import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const ErrorChangePasswordPage = () => {
    const navigate = useNavigate();
    const { changeRepeatedRequest } = useContext(AuthContext);

    const handleButton = () => {
        navigate('/auth/change-password');
        changeRepeatedRequest(true);
    };
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='error'
                title='Данные не сохранились'
                message='Что-то пошло не так. Попробуйте ещё раз.'
                buttonText='Повторить'
                handleButton={handleButton}
                dataTestId={'change-retry-button'}
            />
        </ScreenWrapper>
    );
};
