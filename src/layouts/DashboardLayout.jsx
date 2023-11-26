import { bottomSidebar, sidebar } from '@/data/sidebar';
import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import { Layout, Menu } from 'antd';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  backgroundColor: '#FFF',
  display: 'flex',
  width: '100%',
  justifyContent: 'end',
  alignItems: 'center',
  paddingRight: '86px',
  gap: '12px',
  borderBottom: '1px solid #F2F2F2',
  position: 'fixed',
  zIndex: 100,
};

const DashboardLayout = ({ children }) => {
  const { push } = useRouter();

  const isLargeScreen = useIsLargeScreen();

  const [selectedKeys, setSelectedKeys] = useState('1');

  const handleMenuClick = (navTo, key) => {
    setSelectedKeys(key);
    push(navTo);
  };

  const siderStyle = {
    backgroundColor: '#FAF9F9',
    height: '100vh',
    padding: `${isLargeScreen ? '40px 24px' : '15px 10px'}`,
    position: 'fixed',
    zIndex: 101,
  };

  const menuStyle = {
    backgroundColor: '#FAF9F9',
    border: 'none',
    marginTop: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    color: '#595D62',
    borderBottom: '1px solid #E2E2E2',
  };

  const selectedMenuItemStyle = {
    fontWeight: '600',
    color: '#1A1F21',
  };

  const contentStyle = {
    textAlign: 'center',
    backgroundColor: '#FFF',
    marginLeft: `${isLargeScreen ? '259px' : '80px'}`,
    marginTop: '50px',
    minHeight: '100vh',
    paddingTop: '48px',
  };
  const footerStyle = {
    backgroundColor: '#FFF',
    textAlign: 'center',
    marginLeft: `${isLargeScreen ? '259px' : '80px'}`,
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const selectedItem = sidebar?.find((item) => item?.navTo === currentPath);
    if (selectedItem) {
      setSelectedKeys(selectedItem?.id);
    }
    else {
      setSelectedKeys((prev)=> prev)
    }
  }, []);

  return (
    <Layout>
      <Sider
        style={siderStyle}
        breakpoint='lg'
        collapsedWidth='80px'
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}>
        {isLargeScreen ? (
          <Image
            src={'/dashboardLogo.svg'}
            width={670}
            height={58}
            alt='logo'
          />
        ) : (
          <Image src={'/logoIcon.svg'} width={91} height={67} alt='logo' />
        )}

        <Menu
          style={menuStyle}
          mode='inline'
          onSelect={({ key }) => {
            const selectedItem = sidebar.find((item) => item.id === key);
            if (selectedItem) {
              handleMenuClick(selectedItem.navTo, key);
            }
          }}
          items={sidebar.map(({ id, title, icon, activeIcon }, index) => ({
            key: id,
            label: title,
            icon: (
              <Image
                src={selectedKeys?.includes(id) ? activeIcon : icon}
                width={18}
                height={18}
                alt='icon'
              />
            ),
            style: selectedKeys?.includes(id) ? selectedMenuItemStyle : {},
          }))}
        />
        <Menu
          style={{ ...menuStyle, borderBottom: 'none', marginTop: 0 }}
          mode='inline'
          items={bottomSidebar.map(({ id, title, icon, navTo }, index) => ({
            key: id,
            label: title,
            icon: <Image src={icon} width={18} height={18} alt='icon' />,
            onClick: () => {
              signOut({callbackUrl: '/auth/login'});
            }
          }))}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <div className='p-2 rounded-full bg-primary-surface text-black text-sm font-bold'>
            TP
          </div>
          <div>Tola Park</div>
        </Header>
        <Content style={contentStyle}>{children}</Content>
        <Footer style={footerStyle}>
          MedBot AI should not be blindly trusted
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
