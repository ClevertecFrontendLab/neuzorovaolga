import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';

export const ErrorChangePasswordPage = () => {
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='error'
                title='Данные не сохранились'
                message='Что-то пошло не так. Попробуйте ещё раз.'
                buttonText='Повторить'
                handleButton={() => {
                    return;
                }}
            />
        </ScreenWrapper>
    );
};
