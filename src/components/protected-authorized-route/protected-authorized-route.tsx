import { Navigate } from 'react-router-dom';
import { PATH } from '../../router';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

type Props = {
    component: React.ReactNode;
};

export const ProtectedAuthorizeRoute = ({ component }: Props) => {
    const { isAuthorized } = useContext(GlobalContext);

    return isAuthorized ? component : <Navigate to={PATH.AUTH} replace />;
};
