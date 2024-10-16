import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './TrackExpenses.module.scss';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { formatNumber } from '../../utils';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const TrackExpenses = () => {
    const { data, refetch } = useQuery({
        queryKey: ['EXPENSES'],
        queryFn: () => apiClient.get('/expenses'),
    });

    const mutation = useMutation({
        mutationFn: (id) => apiClient.delete(`/expenses/${id}`),
        onSuccess: () => {
            toast.success('Xoá thành công');
            refetch();
        },
    });

    const onDelete = (id) => {
        const isConfirm = confirm('Xác nhận xoá khoản chi?');

        isConfirm && mutation.mutate(id);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Track Expenses</h1>
                    <Link className={styles.add} to="/expenses/add">Add Expenses</Link>
                </div>
                <table className={styles.expenseTable}>
                    <thead>
                        <tr>
                            <th>Mô tả</th>
                            <th>Ngày tháng</th>
                            <th>Số tiền</th>
                            <th>Danh mục</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="expense-table-body">
                        {data?.data?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{dayjs(item.date).format('DD/MM/YYYY')}</td>
                                <td>{formatNumber(item.price)}</td>
                                <td>{item.budget.name}</td>
                                <td>
                                    <Link to={`/expenses/${item._id}/edit`}>
                                        <button>Chỉnh sửa</button>
                                    </Link>
                                    <button onClick={() => onDelete(item._id)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TrackExpenses;
