import styles from './UpdateExpenses.module.scss';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const UpdateExpenses = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { data } = useQuery({
        queryKey: ['BUDGET'],
        queryFn: () => apiClient.get('/budgets'),
    });

    const { data: expenses } = useQuery({
        queryKey: ['EXPENSES', params?.id],
        queryFn: () => apiClient.get(`/expenses/${params?.id}`),
    });

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({
            description: expenses?.data?.description,
            date: dayjs(expenses?.data?.date).format('YYYY-MM-DD'),
            price: expenses?.data?.price,
            budget: expenses?.data?.budget?._id,
        });
    }, [expenses?.data]);

    const mutation = useMutation({
        mutationFn: (data) => apiClient.put(`/expenses/${params?.id}`, data),
        onSuccess: () => {
            toast.success('Cập nhật thành công');
            navigate('/trackExpenses');
        },
    });

    return (
        <>
            <div className={styles.container}>
                <div>
                    <h1>Update Expenses</h1>

                    <h3 className={styles.backTo} onClick={() => navigate(-1)}>Quay lại</h3>
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
                    <button type="submit">Cập nhật chi phí</button>
                </form>
            </div>
        </>
    );
};

export default UpdateExpenses;
