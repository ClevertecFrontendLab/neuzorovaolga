import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';

export const ErrorLoginPage = () => {
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='warning'
                title='Вход не выполнен'
                message='Что-то пошло не так. Попробуйте еще раз'
                buttonText='Повторить'
                handleButton={() => {
                    return;
                }}
            />
        </ScreenWrapper>
    );
};
