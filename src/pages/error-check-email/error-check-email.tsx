import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';
import { PATH } from '../../router';
import { ServerErrorModal } from '@components/server-error-modal/server-error-modal.tsx';

export const ErrorCheckEmailPage = () => {
    const navigate = useNavigate();
    const { changeRepeatedRequest } = useContext(AuthContext);

    const handleButton = () => {
        changeRepeatedRequest(true);
        navigate(PATH.AUTH);
    };
    return (
        <ScreenWrapper>
            <ServerErrorModal handleButton={handleButton} />
        </ScreenWrapper>
    );
};
