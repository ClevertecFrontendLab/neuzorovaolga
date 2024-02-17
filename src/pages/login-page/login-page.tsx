import React from 'react';
import Logo from './../../assets/img/infoCardLogo.png';
import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import styles from './login-page.module.css';

import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input } from 'antd';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { loginRequest } from './../../api/auth';
import { useNavigate } from 'react-router-dom';

interface FormData {
    username: string;
    password: string;
    remember: string;
}

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const items1: MenuProps['items'] = ['Вход', 'Регистрация'].map((key) => ({
        key,
        label: `${key}`,
        style: { width: 184, textAlign: 'center', fontSize: 16, padding: 0 },
        onClick: () => {
            if (key === 'Регистрация') {
                navigate('/auth/registration');
            }
        },
    }));

    const onFinish = ({ username, password }: FormData) => {
        loginRequest(username, password)
            .then((data) => {
                console.log('data', data);
                navigate('/main');
            })
            .catch(() => {
                navigate('/result/error-login');
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                <img className={styles.logo} src={Logo} />

                <div className={styles.form}>
                    <div className={styles.buttonWrapper}>
                        <Menu mode='horizontal' defaultSelectedKeys={['Вход']} items={items1} />
                    </div>

                    <Form
                        name='basic'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ width: '100%', height: 270 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <Form.Item<FormData>
                            name='username'
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                addonBefore='e-mail:'
                                size='large'
                                style={{ width: 368, marginBottom: 8 }}
                            />
                        </Form.Item>

                        <Form.Item<FormData>
                            name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                placeholder='Пароль'
                                size='large'
                                style={{ width: 368 }}
                            />
                        </Form.Item>
                        <div className={styles.checkAndLink}>
                            <Form.Item<FormData>
                                name='remember'
                                valuePropName='checked'
                                wrapperCol={{ span: 40 }}
                            >
                                <Checkbox>Запомнить меня</Checkbox>
                            </Form.Item>
                            <Button
                                type='link'
                                style={{
                                    paddingRight: 0,
                                    fontSize: 16,
                                }}
                            >
                                Забыли пароль?
                            </Button>
                        </div>
                        <Form.Item wrapperCol={{ span: 360 }}>
                            <Button type='primary' htmlType='submit' block size='large'>
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button type='default' block size='large' icon={<GooglePlusOutlined />}>
                        Войти через Google
                    </Button>
                </div>
            </div>
        </ScreenWrapper>
    );
};
