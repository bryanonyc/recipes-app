
import { Layout, Space } from 'antd';
import { ReactNode } from 'react';
import { UserDropdown } from './UserDropdown';

const { Header, Content, Footer } = Layout;

interface Props {
    children: ReactNode;
}

const AppLayout = (props: Props) => {
    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    zIndex: 1,
                    width: '100%',
                    display: 'inline-block',
                    background: '#f5f5f5'
                }}
            >
                <div className='app-title'>
                    <h1>Recipe Finder</h1>
                </div>
                <div className='user-menu'>
                    <UserDropdown />
                </div>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <div
                style={{
                padding: 24,
                background: '#ccc',
                borderRadius: 0
                }}
            >
                { props.children }
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Bryan Ogden ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}

export default AppLayout
