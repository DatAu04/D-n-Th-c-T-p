import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './BudgetSettings.module.scss';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { formatNumber } from '../../utils';
import { toast } from 'react-toastify';

const BudgetSettings = () => {
    const { data, refetch } = useQuery({
        queryKey: ['BUDGET'],
        queryFn: () => apiClient.get('/budgets'),
    });

    const mutation = useMutation({
        mutationFn: (id) => apiClient.delete(`/budgets/${id}`),
        onSuccess: () => {
            toast.success('Xoá thành công');
            refetch();
        },
    });

    const onDelete = (id) => {
        const isConfirm = confirm('Xác nhận xoá cấu hình ngân sách?');

        isConfirm && mutation.mutate(id);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles}>
                    <h1>Budget Settings</h1>
                    <Link className={styles.add} to="/budget/add">Add Budget</Link>
                </div>
                <table className={styles.expenseTable}>
                    <thead>
                        <tr>
                            <th>Danh mục</th>
                            <th>Ngân sách</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="expense-table-body">
                        {data?.data?.map((it, index) => (
                            <tr key={index}>
                                <td>{it.name}</td>
                                <td>{formatNumber(it.budget)}</td>
                                <td>
                                    <Link to={`/budget/${it._id}/edit`}>
                                        <button>Chỉnh sửa</button>
                                    </Link>
                                    <button onClick={() => onDelete(it._id)}>
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

export default BudgetSettings;
