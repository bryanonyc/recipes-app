import { Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';

import type { MenuProps } from 'antd';
import LogoutButton from '../features/auth/LogoutButton';
import { Link } from 'react-router-dom';


export const UserDropdown = () => {
    const { name, isAdmin } = useAuth();

    const adminItems: MenuProps['items'] = [
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
            type: 'divider',
        },
        {
            key: 'logout',
            label: <LogoutButton />,
        }
    ];

    let items: MenuProps['items'] = isAdmin ? adminItems : nonAdminItems;

    return (
        <Dropdown menu={{ items }} arrow placement='bottom'>
            <Space>
                { name }
                <UserOutlined />
            </Space>
        </Dropdown>
    );
}
