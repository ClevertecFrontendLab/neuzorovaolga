import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveTokenHelper } from '@utils/storage.ts';
import { GlobalContext } from '@context/GlobalContext.tsx';
import { PATH } from '@app/router';

export default function useGoogleAuth() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const token = new URLSearchParams(search).get('accessToken');
    const { logIn } = useContext(GlobalContext);

    useEffect(() => {
        if (token) {
            logIn();
            saveTokenHelper(token, false);
            navigate(PATH.MAIN);
        }
    }, []);
}
