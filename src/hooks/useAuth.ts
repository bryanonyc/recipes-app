import { useAppSelector } from '../app/hooks';
import { selectCurrentToken } from '../features/auth/authSlice';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface UserInfo extends JwtPayload {
    name: string,
    email: string,
    isAdmin: boolean,
}

export const useAuth = () => {
    const accessToken = useAppSelector(selectCurrentToken);

    if (accessToken) {
        const decodedToken = jwtDecode<UserInfo>(accessToken);
        const { name, email, isAdmin } = decodedToken;

        return { name, email, isAdmin };
    } else {
        return { name: '', email: '', isAdmin: false };
    }
}
