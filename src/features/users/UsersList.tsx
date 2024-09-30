import { useRef, useState } from 'react';
import type { InputRef, TableColumnType } from 'antd';
import { Alert, Button, Checkbox, Empty, Input, Space, Table, TableProps } from 'antd';
import { useGetUsersQuery } from './usersApiSlice'
import { User } from '../../models/user';
import { Link } from 'react-router-dom';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';

type DataIndex = keyof User;

const UsersList = () => {
    const { data: queryData, isSuccess, isError, error } = useGetUsersQuery();

    const [, setSearchText] = useState('');
    const [, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (
        clearFilters: () => void,
        confirm: FilterDropdownProps['confirm']
    ) => {
        clearFilters();
        setSearchText('');
        confirm();
    };


    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<User> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          (
            text
          ),
      });

    const columns: TableProps<User>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
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
