import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../router';

export const ErrorUserExistPage = () => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate(PATH.REGISTRATION);
    };

    return (
        <ScreenWrapper>
            <InfoCard
                iconType='error'
                title='Данные не сохранились'
                message='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                buttonText='Назад к регистрации'
                handleButton={handleButton}
                dataTestId='registration-back-button'
            />
        </ScreenWrapper>
    );
};
