import { bottomSidebar, sidebar } from '@/data/sidebar';
import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import { selectActiveNavigation, setActiveNavigation } from '@/store/appSlice';
import { getUserProfile, selectUser } from '@/store/userSlice';
import { setToken } from '@/utils/http';
import { Layout, Menu, Skeleton } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const { user, loading: profileLoading } = useSelector(selectUser);
  const activeNav = useSelector(selectActiveNavigation);
  const dispatch = useDispatch();

  const { push } = useRouter();

  const isLargeScreen = useIsLargeScreen();

  const [loading, setLoading] = useState(true);

  const handleMenuClick = (navTo, key) => {
    dispatch(setActiveNavigation(key));
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
    fontSize: '12px',
    color: '#595D62'
  };

  useEffect(() => {
    async function getLoader() {
      const { cardio } = await import('ldrs');
      cardio.register();
    }
    getLoader();
  }, []);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    setLoading(false);
  }, [isLargeScreen]);


  if (loading) {
    return (
      <div className='min-h-screen grid place-content-center'>
        <l-cardio size='60' stroke='5' speed='1.5' color='#0098DE'></l-cardio>
      </div>
    );
  }

  return (
    <Layout>
      <Sider style={siderStyle} breakpoint='lg' collapsedWidth='80px'>
        {isLargeScreen ? (
          <Image
            src={'/dashboardLogo.svg'}
            width={670}
            height={58}
            alt='logo'
            onClick={() => push('/dashboard')}
            className='cursor-pointer'
          />
        ) : (
          <Image
            src={'/logoIcon.svg'}
            width={91}
            height={67}
            alt='logo'
            onClick={() => push('/dashboard')}
            className='cursor-pointer'
          />
        )}

        <Menu
          style={menuStyle}
          mode='inline'
          selectedKeys={activeNav}
          onSelect={({ key }) => {
            const selectedItem = sidebar.find((item) => item.id === key);
            if (selectedItem) {
              handleMenuClick(selectedItem.navTo, key);
            }
          }}
          items={sidebar?.map(({ id, title, icon, activeIcon }) => ({
            key: id,
            label: title,
            icon: (
              <Image
                src={activeNav?.includes(id) ? activeIcon : icon}
                width={18}
                height={18}
                alt='icon'
              />
            ),
            style: activeNav?.includes(id) ? selectedMenuItemStyle : {},
          }))}
        />
        <Menu
          style={{ ...menuStyle, borderBottom: 'none', marginTop: 0 }}
          mode='inline'
          items={bottomSidebar?.map(({ id, title, icon }) => ({
            key: id,
            label: title,
            icon: <Image src={icon} width={18} height={18} alt='icon' />,
            onClick: () => {
              signOut({ callbackUrl: '/auth/login' });
            },
          }))}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          {profileLoading ? (
            <Skeleton.Button
              active
              shape={'square'}
              style={{
                height: '2rem',
                width: '150px',
                marginTop: '20px',
              }}
            />
          ) : (
            <>
              <div className='p-2 rounded-full bg-primary-surface text-black text-sm font-bold'>
                <p className='uppercase'>{`${user?.firstName?.charAt(
                  0
                )}${user?.lastName?.charAt(0)}`}</p>
              </div>
              <div>{`${user?.firstName} ${user?.lastName}`}</div>
            </>
          )}
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
