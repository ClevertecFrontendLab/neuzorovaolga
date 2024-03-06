import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoModal } from '@components/info-modal/info-modal.tsx';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../router';

export const ErrorUserExistPage = () => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate(PATH.REGISTRATION);
    };

    return (
        <ScreenWrapper>
            <InfoModal
                iconType='error'
                title='Данные не сохранились'
                message='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                buttonText='Назад к регистрации'
                handleButton={handleButton}
                dataTestId='registration-back-button'
            />
        </ScreenWrapper>
    );
};
