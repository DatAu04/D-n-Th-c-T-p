import { useMutation } from '@tanstack/react-query';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { TOKEN_STORAGE_KEY, USER_INFO_STORAGE_KEY } from '../../constants';

const Login = () => {
    const mutation = useMutation({
        mutationFn: (data) => {
            return apiClient.post('/auth/sign-in', data);
        },
        onSuccess: (r) => {
            localStorage.setItem(TOKEN_STORAGE_KEY, r.data.token);
            localStorage.setItem(
                USER_INFO_STORAGE_KEY,
                JSON.stringify(r.data.user),
            );
            window.location.href = '/';
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    'Có lỗi xảy ra, vui lòng thử lại',
            );
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (values) => {
        mutation.mutate(values);
    };

    return (
        <>
            <div className={styles.container}>
                <form
                    action=""
                    className={styles.login}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2>Login</h2>
                    <label htmlFor="">Email</label> <br />
                    <input
                        type="email"
                        placeholder="Mời nhập email"
                        {...register('email', {
                            required: 'Vui lòng nhập email',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Email không đúng định dạng',
                            },
                        })}
                    />
                    {errors.email && (
                        <p className={styles.error}>{errors.email.message}</p>
                    )}
                    <br />
                    <label htmlFor="">Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder="Mời nhập password"
                        {...register('password', {
                            required: 'Vui lòng nhập mật khẩu',
                        })}
                    />
                    {errors.password && (
                        <p className={styles.error}>
                            {errors.password.message}
                        </p>
                    )}
                    <br />
                    <Link> Forgot password ?</Link>
                    <button> Đăng nhập</button>
                    <p>
                        Bạn chưa có tài khoản ? <Link to="/signup">Signup</Link>
                    </p>
                    <Link to="/dashBoard">Thoát</Link>
                </form>
            </div>
        </>
    );
};

export default Login;
