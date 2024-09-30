import { useNavigate } from 'react-router-dom';
import { Button, TabsProps, Tabs } from 'antd';
import UsersList from './UsersList';

const UsersHome = () => {
    const navigate = useNavigate();

    const gotoRecipes = () => {
        navigate('/recipes');
    };

    const backToRecipes = <Button type='primary' onClick={gotoRecipes}>Back To Recipes</Button>;

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
