import { isNil, isNotNil } from 'ramda';
import { Link, Outlet } from 'react-router-dom';
import { ENVIRONMENT_NOT_SETUP_WARNING } from './Results';

const RequireEnv = () => {
    const BASE_URL = isNotNil(process.env.API_ENDPOINT_BASE_URL) ? process.env.API_ENDPOINT_BASE_URL : process.env.REACT_APP_API_ENDPOINT_BASE_URL;

    if (isNil(BASE_URL)) {
        return <ENVIRONMENT_NOT_SETUP_WARNING extra={<Link to="/">Back</Link>} />;
    } else {
        return <Outlet />;
    }

}

export default RequireEnv
