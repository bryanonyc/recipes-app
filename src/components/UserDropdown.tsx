import { Avatar, Dropdown, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';

import type { MenuProps } from 'antd';
import LogoutButton from '../features/auth/LogoutButton';
import { Link } from 'react-router-dom';


export const UserDropdown = () => {
    const { name, isAdmin } = useAuth();

    const userAvatar = (
        <Avatar style={{ backgroundColor: "#f56a00" }} size="small">
            {name.charAt(0)}
        </Avatar>
    );

    const adminItems: MenuProps['items'] = [
        {
            key: 'name',
            label: (<>{userAvatar} {name}</>),
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'recipes',
            label: 'Recipes',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'mine',
            label: <Link to='/owner'>My Recipes</Link>,
        },
        {
            key: 'favorite',
            label: <Link to='/favorite'>My Favorite Recipes</Link>,
        },
        {
            key: 'uunpublished',
            label: <Link to='/unpublished'>Review Unpublished Recipes</Link>,
        },
        {
            type: 'divider',
        },
        {
            key: 'tasks',
            label: 'Admin Tasks',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'users',
            label: <Link to='/users'>Manage Users</Link>,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: <LogoutButton />,
        }
    ];

    const nonAdminItems: MenuProps['items'] = [
        {
            key: 'name',
            label: (<>{userAvatar} {name}</>),
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'recipes',
            label: 'Recipes',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'mine',
            label: <Link to='/owner'>My Recipes</Link>,
        },
        {
            key: 'favorite',
            label: <Link to='/favorite'>My Favorite Recipes</Link>,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: <LogoutButton />,
        }
    ];

    let items: MenuProps['items'] = isAdmin ? adminItems : nonAdminItems;

    return (
        <Space>
            {userAvatar}
            <Dropdown menu={{ items }} arrow placement='bottom'>
                <MenuOutlined style={{ cursor: 'pointer' }} />
            </Dropdown>
        </Space>
    );
}
