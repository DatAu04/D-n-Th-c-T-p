import axios from 'axios';
import { TOKEN_STORAGE_KEY } from '../constants';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

// Thêm interceptor cho các yêu cầu HTTP
// Sử dụng accessToken trong các yêu cầu tiếp theo
apiClient.interceptors.request.use(
    // interceptors được gọi trước khi yêu cầu được gửi đi và thường được sử dụng để thêm hoặc thay đổi các tiêu đề HTTP.
    // Response interceptors được gọi sau khi phản hồi được nhận và thường được sử dụng để kiểm tra và xử lý lỗi phản hồi.
    function (config) {
        const accessToken = localStorage.getItem(TOKEN_STORAGE_KEY);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

export default apiClient;
