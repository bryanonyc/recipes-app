import { useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Button } from 'antd';
import { useSendLogoutMutation } from './authApiSlice';
import { useAppDispatch } from '../../app/hooks';
import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";

const LogoutButton = () => {
    const [messageApi, contextHolder] = message.useMessage();

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
            navigate('/');
        } else if (error) {
            let errorMessage = 'Logout Error';
            // if ('status' in error) {
            //     errorMessage += ` : ${error.message}`;
            // }
            messageApi.open({
                type: 'error',
                content: errorMessage,
                duration: 0,
              });

            setTimeout(() => {
                messageApi.destroy();
              }, 2000);
        }
    }, [isSuccess, error, dispatch, navigate, messageApi]);

    return (
        <>
        { contextHolder }
        <Button
            type="link"
            size='small'
            onClick={sendLogout}
        >
            Logout
        </Button>
        </>
    )
};

export default LogoutButton
