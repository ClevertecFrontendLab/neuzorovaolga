import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { InfoCard } from '@components/info-card/info-card';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const ErrorCheckEmailNoExistPage = () => {
    const navigate = useNavigate();
    const { changeEmail } = useContext(AuthContext);

    const handleButton = () => {
        changeEmail('');
        navigate('/auth');
    };
    return (
        <ScreenWrapper>
            <InfoCard
                iconType='error'
                title='Такой e-mail не зарегистрирован'
                message='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail'
                buttonText='Попробовать снова'
                handleButton={handleButton}
            />
        </ScreenWrapper>
    );
};
