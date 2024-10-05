import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { isNotNil } from 'ramda';
import LogoutButton from './LogoutButton';
import { selectCurrentToken, setCredentials } from '../auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { useDemoLoginMutation } from './authApiSlice';
import { useAppDispatch } from '../../app/hooks';
import '../../App.css';

const Welcome = () => {
    const accessToken = useAppSelector(selectCurrentToken);
    const dispatch = useAppDispatch();
    const [demoLogin] = useDemoLoginMutation();
    const { username, name } = useAuth();

    const loggedIn = [accessToken, username, name].every(isNotNil)
    const navigate = useNavigate();

    const gotoLogin = () => {
        navigate('/login');
    }

    const gotoRegister = () => {
        navigate('/register');
    }

    let nonRegisterButtonContent;

    if (loggedIn) {
        nonRegisterButtonContent = <LogoutButton />
    } else {
        nonRegisterButtonContent = <Button type='primary' onClick={gotoLogin}>Log In</Button>
    }

    const loginAsDemoUser = async () => {
        const { accessToken } = await demoLogin(null).unwrap();
        dispatch(setCredentials( { accessToken }));
        navigate("/recipes");
    }

    return (
        <div className="home-container">
            <div className={'title-container'}>
                <div>Welcome!</div>
            </div>
            <div className={'home-button-container'}>
                <Space>
                    { nonRegisterButtonContent }
                    <Button
                        type='primary'
                        onClick={gotoRegister}
                        disabled={loggedIn}
                    >
                        Register
                    </Button>
                    <Button
                        type='primary'
                        onClick={loginAsDemoUser}
                        disabled={loggedIn}
                    >
                        Demo Mode
                    </Button>
                </Space>

                {loggedIn ? <div>You're logged in as: {username}</div> : <div />}
            </div>
        </div>
    );
}

export default Welcome;
