import { Flex, Layout } from 'antd';
import { ReactNode } from 'react';
import { UserDropdown } from './UserDropdown';
import SearchRecipes from '../features/recipes/SearchRecipes';

const { Header, Content, Footer } = Layout;

interface Props {
    children: ReactNode;
}

const AppLayout = (props: Props) => {
    return (
        <div className='app-layout-container'>
            <Layout className='app-layout'>
                <Header className='app-layout-header'>
                    <Flex align='center' justify='space-between'>
                        <SearchRecipes />
                        <div className='app-title'>Recipe Finder</div>
                        <UserDropdown />
                    </Flex>
                </Header>
                <Content>
                <div className='app-layout-content-container'>
                    { props.children }
                </div>
                </Content>
                <Footer className='app-layout-footer'>
                    Bryan Ogden ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </div>
    );
}

export default AppLayout
