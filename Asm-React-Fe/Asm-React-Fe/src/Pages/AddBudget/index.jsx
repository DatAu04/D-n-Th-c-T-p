import { useForm } from 'react-hook-form';
import styles from './AddBudget.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddBudget = () => {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const mutation = useMutation({
        mutationFn: (data) => apiClient.post('/budgets', data),
        onSuccess: () => {
            toast.success('Thêm ngân sách thành công');

            navigate('/budget');
        },
    });

    const onSubmit = (values) => {
        mutation.mutate(values);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Add Budget</h1>
                    <Link className={styles.backTo} to="/budget">Quay Lại </Link>
                </div>
                <form className={styles.main} id="expense-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="category">Danh mục:</label>
                        <select id="category" {...register('name', { required: true })}>
                            <option value="">Chọn chi phí</option>
                            <option>Ăn uống</option>
                            <option>Đi lại</option>
                            <option>Giải trí</option>
                            <option>Mua sắm</option>
                            <option>Nhà ở</option>
                            <option>Điện, nước, internet</option>
                            <option>Tiết kiệm</option>
                            <option>Học thêm</option>
                            <option>Sách vở, tài liệu học tập</option>
                            <option>Mua sắm</option>
                            <option>Khác</option>
                            
                        </select>
                        {/* <input
                            type="text"
                            id="category"
                            {...register('name', { required: true })}
                        /> */}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="budget">Ngân sách:</label>
                        <input
                            type="number"
                            id="budget"
                            {...register('budget', { required: true })}
                        />
                    </div>

                    <button type="submit">Thêm ngân sách</button>
                </form>
            </div>
        </>
    );
};

export default AddBudget;
