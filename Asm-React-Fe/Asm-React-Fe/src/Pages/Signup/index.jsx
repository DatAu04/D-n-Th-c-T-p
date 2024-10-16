import styles from './Signup.module.scss';
import {} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data) => {
            return apiClient.post('/auth/sign-up', data);
        },
        onSuccess: () => {
            toast.success('Đăng ký thành công');
            navigate('/login');
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
                    className={styles.signup}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2>Signup</h2>
                    <label htmlFor="">Họ tên</label> <br />
                    <input
                        type="text"
                        placeholder="Mời nhập họ"
                        {...register('name', {
                            required: 'Vui lòng nhập họ tên',
                        })}
                    />
                    {errors.name && (
                        <p className={styles.error}>{errors.name.message}</p>
                    )}
                    <br />
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
                    <label htmlFor="">Số điện thoại</label> <br />
                    <input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        {...register('phone', {
                            required: 'Vui lòng nhập số điện thoại',
                            pattern: {
                                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                message: 'Số điện thoại không đúng định dạng',
                            },
                        })}        
                    />
                    {errors.phone && (
                        <p className={styles.error}>{errors.phone.message}</p>
                    )}
                    <br />
                    <label htmlFor="">Mật khẩu</label>
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
                    <button> Đăng ký</button>
                    <p>
                        Bạn chưa có tài khoản ? <Link to="/login">Login</Link>
                    </p>
                    <Link to="/dashBoard">Thoát</Link>
                </form>
            </div>
        </>
    );
};

export default SignUp;
