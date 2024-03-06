import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoModal } from '@components/info-modal/info-modal.tsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { PATH } from '../../router';

export const ErrorChangePasswordPage = () => {
    const navigate = useNavigate();

    const { changeRepeatedRequest } = useContext(AuthContext);

    const handleButton = () => {
        navigate(PATH.CHANGE_PASSWORD);
        changeRepeatedRequest(true);
    };
    return (
        <ScreenWrapper>
            <InfoModal
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
