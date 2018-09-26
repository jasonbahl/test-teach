import React from 'react';
import {Layout} from 'antd';

const {Header, Content} = Layout;

const AppLayout = ({children}) => (
    <Layout className="layout" style={{minHeight: '100vh'}}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div style={{color: "white", fontSize: "32px", textAlign: "center"}}>The Denver Post
            </div>
        </Header>
        <Content style={{padding: '50px', marginTop: 64}}>
            {children}
        </Content>
    </Layout>
);

export default AppLayout;