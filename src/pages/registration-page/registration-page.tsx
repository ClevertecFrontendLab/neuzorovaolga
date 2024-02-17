import React from 'react';
import Logo from './../../assets/img/infoCardLogo.png';
import styles from './registration-page.module.css';
import 'antd/dist/antd.css';
import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';

import { Button, Checkbox, Form, Input } from 'antd';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { checkEmailRequest, registrationRequest } from './../../api/auth';

interface FormData {
    username: string;
    password: string;
    confirmPassword?: string;
}

export const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const items1: MenuProps['items'] = ['Вход', 'Регистрация'].map((key) => ({
        key,
        label: `${key}`,
        style: { width: 184, textAlign: 'center', fontSize: 16, padding: 0 },
        onClick: () => {
            if (key === 'Вход') {
                navigate('/auth');
            }
        },
    }));

    const onFinish = ({ username, password }: FormData) => {
        registrationRequest(username, password)
            .then(() => {
                navigate('/result/success');
            })
            .catch((error) => {
                if (error.statusCode === 409) {
                    navigate('/result/error-user-exist');
                } else {
                    navigate('/result/error');
                }
                console.log('Handler', error);
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
                        <Menu
                            mode='horizontal'
                            defaultSelectedKeys={['Регистрация']}
                            items={items1}
                        />
                    </div>

                    <Form
                        name='basic'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ width: '100%', height: 320 }}
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
                            extra='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        >
                            <Input.Password
                                placeholder='Пароль'
                                size='large'
                                style={{ width: 368 }}
                            />
                        </Form.Item>

                        <Form.Item<FormData>
                            name='confirmPassword'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                placeholder='Повторите пароль'
                                size='large'
                                style={{ width: 368 }}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 360 }}>
                            <Button
                                type='primary'
                                htmlType='submit'
                                block
                                size='large'
                                style={{ marginTop: 36 }}
                            >
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button type='default' block size='large' icon={<GooglePlusOutlined />}>
                        Регистрация через Google
                    </Button>
                </div>
            </div>
        </ScreenWrapper>
    );
};
