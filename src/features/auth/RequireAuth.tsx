import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FORBIDDEN_403 } from '../../components/Results';


const RequireAuth = () => {
    const { isAdmin } = useAuth();

    if (isAdmin) {
        return <Outlet />;
    } else {
        return <FORBIDDEN_403 extra={<Link to="/recipes">Back</Link>} />;
    }
}

export default RequireAuth;
