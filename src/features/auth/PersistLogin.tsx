import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from './authApiSlice'
import { usePersist } from '../../hooks/usePersist'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCurrentToken } from './authSlice'
import { setCredentials } from '../../features/auth/authSlice';
import { Button, Result } from 'antd'

const PersistLogin = () => {
    const [persist] = usePersist();
    const accessToken = useAppSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized, // refresh has not been called yet
        isSuccess,
        isError,
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    const { accessToken } = await refresh(null).unwrap();
                    dispatch(setCredentials( { accessToken }));
                    setTrueSuccess(true);
                }
                catch (err) {
                    console.error(err);
                }
            }

            if (!accessToken && persist) {
                verifyRefreshToken();
            }
        }

        // clean up function
        return () => {
            effectRan.current = true;
        }
    // eslint-disable-next-line
    }, []);


    let content
    if (!persist) { // persist: no
        content = <Outlet />
    } else if (isError) { //persist: yes, token: no
        content = (
            <div className='login-container'>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={
                        <Button
                            type="primary"
                            onClick={() => navigate('/login')}
                        >
                            Please Login
                        </Button>
                    }
                />
            </div>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        content = <Outlet />
    } else if (accessToken && isUninitialized) { //persist: yes, token: yes
        content = <Outlet />
    }

    return (
        <>
            {content}
        </>
    )
}

export default PersistLogin
