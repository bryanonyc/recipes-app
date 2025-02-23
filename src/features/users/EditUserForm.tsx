import { useNavigate, useParams } from 'react-router-dom';
import { useGetUsersQuery, useUpdateUserMutation } from './usersApiSlice';
import { App, Button, Card, Checkbox, Form } from 'antd';
import { isNotNil } from 'ramda';
import { getErrorMessage } from '../../components/Errors';

interface FormData {
    isAdmin: boolean;
    isActive: boolean;
}

const EditUserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useGetUsersQuery(undefined, {
        selectFromResult: ({ data }) => ({
            user: data?.entities[Number(id)]
        })
    });
    const [form] = Form.useForm();
    const { message: antdMessage } = App.useApp();
    const[updateUser, { isLoading }] = useUpdateUserMutation();

    const handleSubmit = async (values: FormData) => {
        const isAdmin = isNotNil(values.isAdmin) ? values.isAdmin : user?.isAdmin;
        const isActive = isNotNil(values.isActive) ? values.isActive : user?.isActive;

        const body = {
            id: Number(id),
            isAdmin,
            isActive
        };

        try {
            const result = await updateUser(body).unwrap();
            antdMessage.success(result.message, 5);
            navigate('/users');
        } catch (err: any) {
            antdMessage.error(getErrorMessage(err), 10);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        navigate(-1);
    };

    return (
        <div className='submit-new-container'>
            <Card
                title="Edit User"
                style={{ width: '100%' }}
            >
                <Form
                    form={form}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Name">
                        {user?.name}
                    </Form.Item>
                    <Form.Item label="Username">
                        {user?.username}
                    </Form.Item>
                    <Form.Item label="Admin" name="isAdmin" valuePropName="checked">
                        <Checkbox defaultChecked={user?.isAdmin} />
                    </Form.Item>
                    <Form.Item label="Active" name="isActive" valuePropName="checked">
                        <Checkbox defaultChecked={user?.isActive} />
                    </Form.Item>
                    <div className='submit-button-container'>
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            Submit
                        </Button>
                        <Button onClick={handleCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default EditUserForm;
