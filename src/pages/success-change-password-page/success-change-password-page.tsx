import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';
import { useNavigate } from 'react-router-dom';

export const SuccessChangePasswordPage = () => {
    const navigate = useNavigate();
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='success'
                title='Пароль успешно изменен'
                message='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
                buttonText='Вход'
                handleButton={() => {
                    navigate('/auth');
                }}
            />
        </ScreenWrapper>
    );
};
