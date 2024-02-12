import React, { useState } from 'react';
import FullLogoSrc from './../../assets/img/Logo.png';
import Exit from './../../assets/img/Vector.png';
import ShortLogoSrc from './../../assets/img/ShortLogo.png';
import styles from './mainPage.module.css';
import 'antd/dist/antd.css';

import {
    CalendarTwoTone,
    HeartFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SolutionOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { PageContainer } from './pageContainer';
import useWindowDimensions from '@hooks/useWindowDimensions';

const { Sider, Content } = Layout;

export const MainPage: React.FC = () => {
    const width = useWindowDimensions();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={styles.wrapper}>
            <Layout className={styles.layout}>
                <Sider trigger={null} collapsible collapsed={collapsed} theme='light' width='208px'>
                    {!collapsed && <img className={styles.logoBig} src={FullLogoSrc} />}
                    {collapsed && <img className={styles.logoSmall} src={ShortLogoSrc} />}
                    <div className={styles.menuWrapper}>
                        <Menu
                            style={{
                                marginTop: '50px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                            }}
                            theme='light'
                            defaultSelectedKeys={['0']}
                            items={[
                                {
                                    key: '1',
                                    icon: <CalendarTwoTone twoToneColor='#061178' />,
                                    label: 'Календарь',
                                },
                                {
                                    key: '2',
                                    icon: <HeartFilled color='#061178' />,
                                    label: 'Тренировки',
                                },
                                {
                                    key: '3',
                                    icon: <TrophyFilled color='link' />,
                                    label: 'Достижения',
                                },
                                {
                                    key: '4',
                                    icon: <SolutionOutlined />,
                                    label: 'Профиль',
                                },
                            ]}
                        />
                        <Menu
                            style={{
                                marginTop: '50px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                borderTop: '1px solid #f0f0f0',
                            }}
                            theme='light'
                            items={[
                                {
                                    key: '5',
                                    icon: <img src={Exit} />,
                                    label: 'Выход',
                                },
                            ]}
                        />
                    </div>
                </Sider>
                <Layout className={styles.siteLayout}>
                    <Content
                        className={styles.siteLayoutBackground}
                        style={{
                            margin: '0px 0px',
                            padding: 0,
                            minHeight: 280,
                        }}
                    >
                        <button
                            className={styles.trigger}
                            data-test-id='sider-switch'
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </button>

                        <PageContainer collapsed={!!collapsed} />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};
