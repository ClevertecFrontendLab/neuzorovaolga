import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { PATH } from '../../router';

export const ServerErrorPage = () => {
    const navigate = useNavigate();

    const { changeRepeatedRequest } = useContext(AuthContext);

    const handleButton = () => {
        changeRepeatedRequest(true);
        navigate(PATH.REGISTRATION);
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
