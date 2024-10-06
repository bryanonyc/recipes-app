import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from './authApiSlice';
import { App, Alert, Button, Form, Input } from 'antd';
import { RegisterCredentials } from '../../models/reegisterCredentials';
import { getErrorMessage } from '../../components/Errors';

const Register = () => {
    const { message: antdMessage } = App.useApp()
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const [register] = useRegisterMutation();

    const handleSubmit = async (values: RegisterCredentials) => {
        try {
            const response = await register(values).unwrap();
            antdMessage.success(response.message, 5);
            gotoLogin();
        } catch (err: any) {
            const errorMsg = getErrorMessage(err);
            setErrMsg(errorMsg);
        }
    }

    const gotoLogin = () => {
        navigate("/login");
    };

    const gotoWelcome = () => {
        navigate("/");
    };

    const content = (
        <>
            <h1>Recipe Finder App</h1>

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
                className='register-form'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name.'}]}>
                        <Input placeholder='John Doe' />
                </Form.Item>
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
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form>
            <Button className='link-button' type="link" onClick={gotoLogin}>
                Already have an account?  Login here.
            </Button>
            <Button className='link-button' type="link" onClick={gotoWelcome}>
                Or, back to the Welcome page.
            </Button>
        </>
    );

    return (
        <div className='register-container'>
            {content}
        </div>
    )
}

export default Register;
