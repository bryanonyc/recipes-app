import { App, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { isNotNil } from 'ramda';
import LogoutButton from './LogoutButton';
import { selectCurrentToken, setCredentials } from '../auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { useDemoLoginMutation } from './authApiSlice';
import { useAppDispatch } from '../../app/hooks';
import '../../App.css';
import { getErrorMessage } from '../../components/Errors';

const Welcome = () => {
    const { message: antdMessage } = App.useApp()
    const accessToken = useAppSelector(selectCurrentToken);
    const dispatch = useAppDispatch();
    const [demoLogin, { isLoading }] = useDemoLoginMutation();
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
        nonRegisterButtonContent = <Button type='primary' onClick={gotoLogin} disabled={isLoading}>Log In</Button>
    }

    const loginAsDemoUser = async () => {
        try {
            const { accessToken } = await demoLogin(null).unwrap();
            dispatch(setCredentials( { accessToken }));
            navigate("/recipes");
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            antdMessage.error(errorMsg, 5);
        }
    }

    return (
        <div className="home-container">
            <div className={'title-container'}>
                <div>Welcome!</div>
            </div>
            <div className={'body-container'}>
                <p>This application is built using:</p>

                <Button type="link" href='https://react.dev/' target='_'>React</Button>
                <Button type="link" href='https://redux-toolkit.js.org/' target='_'>Redux Toolkit</Button>
                <Button type="link" href='https://ant.design/' target='_'>Ant Design</Button>
                <Button type="link" href='https://nodejs.org/en' target='_'>Node.js</Button>
                <Button type="link" href='https://expressjs.com/' target='_'>Express</Button>
                <Button type="link" href='https://www.prisma.io/' target='_'>Prisma</Button>
                <Button type="link" href='https://www.postgresql.org/' target='_'>Postgres</Button>
            </div>

            <div className={'weloome-helper-text'}>
                <p>Click Demo Mode below to test out the app or Login / Register.</p>
            </div>

            <div className={'home-button-container'}>
                <Space>
                    <Button
                        type='primary'
                        onClick={loginAsDemoUser}
                        disabled={loggedIn || isLoading}
                        style={{ backgroundColor: 'green' }}
                    >
                        Demo Mode
                    </Button>
                    { nonRegisterButtonContent }
                    <Button
                        type='primary'
                        onClick={gotoRegister}
                        disabled={loggedIn || isLoading}
                    >
                        Register
                    </Button>
                </Space>

                {loggedIn ? <div>You're logged in as: {username}</div> : <div />}
            </div>
        </div>
    );
}

export default Welcome;
