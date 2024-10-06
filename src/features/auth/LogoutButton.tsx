import { useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, App } from 'antd';
import { useSendLogoutMutation } from './authApiSlice';
import { useAppDispatch } from '../../app/hooks';
import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";
import { getErrorMessage } from '../../components/Errors';

const LogoutButton = () => {
    const { message: antdMessage }= App.useApp();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [sendLogout, {
        isSuccess,
        error
    }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) {
            dispatch(logOut());
            dispatch(apiSlice.util.resetApiState());
            navigate('/login');
        } else if (error) {
            antdMessage.error(getErrorMessage(error), 10);
        }
    }, [isSuccess, error, dispatch, navigate, antdMessage]);

    return (
        <>
        <Button
            type="primary"
            size='small'
            onClick={sendLogout}
            className='logout-button'
        >
            Logout
        </Button>
        </>
    )
};

export default LogoutButton
