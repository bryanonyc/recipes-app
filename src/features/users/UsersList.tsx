import { Alert, Button, Checkbox, Empty, Table, TableProps } from 'antd';
import { useGetUsersQuery } from './usersApiSlice'
import { User } from '../../models/user';
import { Link, useNavigate } from 'react-router-dom';

const UsersList = () => {
    const navigate = useNavigate();
    const { data: queryData, isSuccess, isError, error } = useGetUsersQuery();

    const columns: TableProps<User>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Admin',
            key: 'isAdmin',
            render: (_, record) => (
                <Checkbox checked={record.isAdmin} disabled />
            ),
        },
        {
            title: 'Active',
            key: 'isActive',
            render: (_, record) => (
                <Checkbox checked={record.isActive} disabled />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Link to={`${record.id}/edit`}>Edit</Link>
            ),
          },
    ];

    let tableData: User[] = [];
    let content;

    if (isSuccess) {
        const { ids, entities } = queryData;
        tableData = ids.map((id) => ({
            key: id,
            ...entities[id]
        }));

        if (tableData.length > 0) {
            content = <Table<User>
                    bordered
                    dataSource={tableData}
                    columns={columns}
                  />;
        } else {
            content = <Empty />
        }

    }

    let errorContent;

    if (error) {
        content = <Empty />
        if ('status' in error) {
            let message;
            if ('error' in error) {
                message = error.error;
            } else {
                const rawMessage = JSON.stringify(error.data);
                message = JSON.parse(rawMessage).message;
            }
            errorContent = <Alert message={`Error: ${error?.status}`} description={message} type='error'/>
        }
    }

    return (
        <>
            { isError && errorContent }
            { content }
        </>
    )
}

export default UsersList;
