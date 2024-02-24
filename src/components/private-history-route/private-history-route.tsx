import { getRouterSelector } from '@redux/selector';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { PATH } from '../../router';

interface Props {
    component: React.ReactNode;
}

export const PrivateHistoryRoute = ({ component }: Props) => {
    const router = useSelector(getRouterSelector);
    return router.previousLocations.length > 1 ? component : <Navigate to={PATH.AUTH} replace />;
};
