import styles from './AddTrack.module.scss';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddTrack = () => {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['BUDGET'],
        queryFn: () => apiClient.get('/budgets'),
    });

    const { register, handleSubmit } = useForm();

    const mutation = useMutation({
        mutationFn: (data) => apiClient.post(`/expenses`, data),
        onSuccess: () => {
            toast.success('Thêm mới thành công');
            navigate('/trackExpenses');
        },
    });

    return (
        <>
            <div className={styles.container}>
                <div>
                    <h1>Add Expenses</h1>

                    <Link className={styles.backTo} to="/trackExpenses">Quay Lại </Link>

                </div>
                <form 
                    className={styles.main}
                    id="expense-form"
                    onSubmit={handleSubmit(mutation.mutate)}
                >
                    <div
                        className={clsx(styles.formGroup, styles.formGroupOne)}
                    >
                        <label htmlFor="description">Mô tả:</label>
                        <textarea
                            {...register('description', { required: true })}
                            id="description"
                        ></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="date">Ngày tháng:</label>
                        <input
                            type="date"
                            id="date"
                            {...register('date', {
                                required: true,
                            })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="amount">Số tiền:</label>
                        <input
                            type="number"
                            id="amount"
                            {...register('price', {
                                required: true,
                            })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="category">Danh mục:</label>
                        <select
                            id="category"
                            {...register('budget', { required: true })}
                        >
                            {data?.data?.map((it) => (
                                <option key={it._id} value={it._id}>
                                    {it.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Thêm chi phí</button>
                </form>
            </div>
        </>
    );
};

export default AddTrack;
