import { useNavigate } from 'react-router-dom';
import { Button, TabsProps, Tabs, Tooltip } from 'antd';
import UsersList from './UsersList';
import { ArrowLeftOutlined } from '@ant-design/icons';

const UsersHome = () => {
    const navigate = useNavigate();

    const gotoRecipes = () => {
        navigate('/recipes');
    };

    const backToRecipes = (
        <Tooltip title='Back to published recipes' color='blue' placement='left'>
            <Button type='primary' onClick={gotoRecipes}>
                <ArrowLeftOutlined/>
            </Button>
        </Tooltip>
    )

    const items: TabsProps['items'] = [
        {
            key: 'users',
            label: 'Users',
            children: ( <UsersList />)
        }
    ];

    return <Tabs tabBarExtraContent={backToRecipes} items={items} />;
}

export default UsersHome;
