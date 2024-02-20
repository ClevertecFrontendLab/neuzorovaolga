import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';

export const ServerErrorPage = () => {
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='error'
                title='Данные не сохранились'
                message='Что-то пошло не так и ваша  регистрация не завершилась. Попробуйте ещё раз.'
                buttonText='Повторить'
                handleButton={() => {
                    return;
                }}
            />
        </ScreenWrapper>
    );
};
