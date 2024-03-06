import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoModal } from '@components/info-modal/info-modal.tsx';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../router';

export const SuccessChangePasswordPage = () => {
    const navigate = useNavigate();
    return (
        <ScreenWrapper>
            <InfoModal
                iconType='success'
                title='Пароль успешно изменен'
                message={`Теперь можно войти в аккаунт, используя
                свой логин и новый пароль`}
                buttonText='Вход'
                handleButton={() => {
                    navigate(PATH.AUTH);
                }}
                dataTestId={'change-entry-button'}
            />
        </ScreenWrapper>
    );
};
