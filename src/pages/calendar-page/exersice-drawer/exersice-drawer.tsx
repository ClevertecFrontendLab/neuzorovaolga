import { hideDrawer } from '@redux/calendar/reducer';
import { selectIsDrawer } from '@redux/calendar/selectors';
import { Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const ExersiceDrawer = () => {
    const dispatch = useDispatch();
    const isDrawer = useSelector(selectIsDrawer);
    const onClose = () => {
        dispatch(hideDrawer());
    };
    return (
        <Drawer
            title='Basic Drawer'
            placement='right'
            closable={false}
            onClose={onClose}
            open={isDrawer}
            getContainer={false}
            style={{ position: 'absolute' }}
        >
            <p>Some contents...</p>
        </Drawer>
    );
};
