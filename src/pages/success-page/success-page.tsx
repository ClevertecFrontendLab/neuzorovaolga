import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';

export const SuccessPage = () => {
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='success'
                title='Регистрация успешна'
                message='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль'
                buttonText='Войти'
                handleButton={() => {
                    return;
                }}
            />
        </ScreenWrapper>
    );
};
