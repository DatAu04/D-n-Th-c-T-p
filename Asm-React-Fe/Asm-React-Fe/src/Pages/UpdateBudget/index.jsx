import { useForm } from 'react-hook-form';
import styles from './UpdateBudget.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const UpdateBudget = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { register, handleSubmit, reset } = useForm();

    const { data } = useQuery({
        queryKey: ['BUDGET', params?.id],
        queryFn: () => apiClient.get(`/budgets/${params?.id}`),
    });

    const mutation = useMutation({
        mutationFn: (data) => apiClient.put(`/budgets/${params?.id}`, data),
        onSuccess: () => {
            toast.success('Sửa ngân sách thành công');

            navigate('/budget');
        },
    });

    useEffect(() => {
        reset(data?.data);
    }, [data?.data]);

    const onSubmit = (values) => {
        mutation.mutate(values);
    };

    return (
        <>
            <div className={styles.container}>
                <div>
                    <h1>Update Budget</h1>
                    <h3 className={styles.backTo} onClick={() => navigate(-1)}>Quay lại</h3>
                </div>
                <form className={styles.main} id="expense-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="category">Danh mục:</label>
                        <input
                            type="text"
                            id="category"
                            {...register('name', { required: true })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="budget">Ngân sách:</label>
                        <input
                            type="number"
                            id="budget"
                            {...register('budget', { required: true })}
                        />
                    </div>

                    <button type="submit">Cập nhật ngân sách</button>
                </form>
            </div>
        </>
    );
};

export default UpdateBudget;
