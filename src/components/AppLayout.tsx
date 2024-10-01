
import { Button, Layout } from 'antd';
import { ReactNode } from 'react';
import { UserDropdown } from './UserDropdown';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
interface Props {
    children: ReactNode;
}

const AppLayout = (props: Props) => {
    const navigate = useNavigate();

    const gotoNewRecipe = () => {
        navigate('/recipes/new');
    };

    return (
        <div className='app-layout-container'>
            <Layout className='app-layout'>
                <Header className='app-layout-header'>
                    <Button type='primary' onClick={gotoNewRecipe}>Submit New Recipe</Button>
                    <UserDropdown />
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
