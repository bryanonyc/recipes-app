import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from './authApiSlice';
import { message, Alert, Button, Form, Input } from 'antd';
import { RegisterCredentials } from '../../models/reegisterCredentials';


const Register = () => {
    const [antdMessage, antDMessageContent] = message.useMessage();

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    // if (isLoading) {
    //     return <p>Loading...</p>
    // }

    const handleSubmit = async (values: RegisterCredentials) => {
        console.log(values);
        try {
            await register(values).unwrap();
            // setEmail('');
            // setPassword('');
            antdMessage.open({
                type: 'success',
                content: 'Registration was successful. Redirecting to Login page.',
                duration: 0,
              });

            setTimeout(() => {
                antdMessage.destroy();
                navigate("/login");
              }, 2000);
        } catch (err: any) {
            console.error('registration error', err);
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
        }
    }

    const gotoLogin = () => {
        navigate("/login");
    };

    const content = (
        <>
            {antDMessageContent}
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
                        <Input
                            // value={name}
                            placeholder='John Doe'
                            // onChange={(e) => setName(e.target.value)}
                        />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email.'}]}>
                        <Input
                            // value={email}
                            placeholder='youremail@example.com'
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password.'}]}>
                        <Input.Password
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form>
            <Button className='link-button' type="link" onClick={gotoLogin}>
                Already have an account?  Login here.
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
