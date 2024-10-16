export const formatNumber = (val) => {
    return val.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};
// style: 'currency' chỉ định rằng số sẽ được định dạng như tiền tệ.
// toLocaleString: Phương thức chuyển đổi số thành chuỗi ký tự theo định dạng ngôn ngữ cụ thể và định dạng tiền tệ.
// Mã ngôn ngữ 'it-IT': Sử dụng để định dạng số giống như tiền tệ Việt Nam.