import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';

import type { MenuProps } from 'antd';
import LogoutButton from '../features/auth/LogoutButton';
import { Link } from 'react-router-dom';


export const UserDropdown = () => {
    const { name, isAdmin } = useAuth();

    const adminItems: MenuProps['items'] = [
        {
            key: 'manageUsers',
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
            key: 'logout',
            label: <LogoutButton />,
        }
    ];

    let items: MenuProps['items'] = isAdmin ? adminItems : nonAdminItems;

    return (
        <Dropdown menu={{ items }}>
            <Space>
                { name }
                <DownOutlined />
            </Space>
        </Dropdown>
    );
}
