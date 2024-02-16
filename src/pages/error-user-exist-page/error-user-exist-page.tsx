import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';

export const ErrorUserExistPage = () => {
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='error'
                title='Данные не сохранились'
                message='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                buttonText='Назад к регистрации'
                handleButton={() => {
                    return;
                }}
            />
        </ScreenWrapper>
    );
};
