import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import styles from './change-password-page.module.css';
import { Button, Checkbox, Form, Input } from 'antd';

export const ChangePasswordPage = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        password?: string;
        placeholder?: string;
        remember?: string;
    };
    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                <div className={styles.title}>Восстановление аккаунта</div>
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
                    <Form.Item<FieldType>
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        extra='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password
                            placeholder='Новый пароль'
                            size='large'
                            style={{ width: 368, fontSize: '15px' }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            size='large'
                            style={{ width: 368, fontSize: '15px' }}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 360 }}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            block
                            size='large'
                            style={{ marginTop: 38 }}
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </ScreenWrapper>
    );
};
