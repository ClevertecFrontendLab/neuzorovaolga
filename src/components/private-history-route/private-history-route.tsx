import { getRouterSelector } from '@redux/selector';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { PATH } from '@app/router';
import { useContext } from 'react';
import { GlobalContext } from '@context/GlobalContext';

interface Props {
    component: React.ReactNode;
}

export const PrivateHistoryRoute = ({ component }: Props) => {
    const { isAuthorized } = useContext(GlobalContext);
    const router = useSelector(getRouterSelector);
    return router.previousLocations.length > 1 ? (
        component
    ) : (
        <Navigate to={isAuthorized ? PATH.MAIN : PATH.AUTH} replace />
    );
};
