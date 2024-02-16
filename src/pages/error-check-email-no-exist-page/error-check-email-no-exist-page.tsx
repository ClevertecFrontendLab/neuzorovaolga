import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';

export const ErrorCheckEmailNoExistPage = () => {
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='error'
                title='Такой e-mail не зарегистрирован'
                message='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail'
                buttonText='Попробовать снова'
                handleButton={() => {
                    return;
                }}
            />
        </ScreenWrapper>
    );
};
