import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoModal } from '@components/info-modal/info-modal.tsx';
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
            <InfoModal
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
