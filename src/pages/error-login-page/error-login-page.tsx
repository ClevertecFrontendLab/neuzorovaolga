import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoModal } from '@components/info-modal/info-modal.tsx';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../router';

export const ErrorLoginPage = () => {
    const navigate = useNavigate();

    const handleButton = () => {
        navigate(PATH.AUTH);
    };
    return (
        <ScreenWrapper>
            <InfoModal
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
