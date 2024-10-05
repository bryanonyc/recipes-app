import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { LoginCredentials } from '../../models/loginCredentials';
import { getErrorMessage } from '../../components/Errors';
import { usePersist } from '../../hooks/usePersist';

const Login = () => {
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [login] = useLoginMutation();

    const [persist, setPersist] = usePersist();

    const handleToggle = () => setPersist((prev: boolean) => !prev);

    const gotoRegister = () => {
        navigate("/register");
    };

    const handleSubmit = async (values: LoginCredentials) => {
        try {
            const { accessToken } = await login(values).unwrap();
            dispatch(setCredentials( { accessToken }));
            navigate("/recipes");
        } catch (err: any) {
            console.error(err);
            const errorMsg = getErrorMessage(err);
            setErrMsg(errorMsg);
        }
    }

    const content = (
        <>
            {
                errMsg &&
                <div className='auth-error'>
                    <Alert
                        message={errMsg}
                        type="error"
                        showIcon
                    />
                </div>
            }

            <Form
                className='login-form'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username.'}]}>
                        <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password.'}]}>
                        <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Checkbox
                        onChange={handleToggle}
                        checked={persist}
                    >
                        Trust This Device
                    </Checkbox>
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form>

            <Button className='link-button' type="link" onClick={gotoRegister}>
                No account?  Register here.
            </Button>
        </>
    );

    return (
        <div className='login-container'>
            {content}
        </div>
    )
}

export default Login;
