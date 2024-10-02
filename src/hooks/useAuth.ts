import { useAppSelector } from '../app/hooks';
import { selectCurrentToken } from '../features/auth/authSlice';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface UserInfo extends JwtPayload {
    name: string,
    username: string,
    isAdmin: boolean,
}

export const useAuth = () => {
    const accessToken = useAppSelector(selectCurrentToken);

    if (accessToken) {
        const decodedToken = jwtDecode<UserInfo>(accessToken);
        const { name, username, isAdmin } = decodedToken;

        return { name, username, isAdmin };
    } else {
        return { name: '', username: '', isAdmin: false };
    }
}
