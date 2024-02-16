import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';

export const SuccessChangePasswordPage = () => {
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='success'
                title='Пароль успешно изменен'
                message='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
                buttonText='Войти'
                handleButton={() => {
                    return;
                }}
            />
        </ScreenWrapper>
    );
};
