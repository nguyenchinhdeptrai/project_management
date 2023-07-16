//Dữ liệu biểu đồ Doanh thu
// Dữ liệu biểu đồ cột (có thể đưa vào từ server hoặc tạo ngay tại đây)
const dataDT = {
    2022: [500, 800, 700, 1000, 600, 900, 1200, 950, 1100, 1300, 850, 1050],
    2023: [500, 800, 700, 1000, 600, 900, 500, 300, 100, 400, 800, 1500],
    // Các năm khác có thể được thêm vào đây
};
function updateChart() {
    const selectedYear = document.getElementById('yearSelect').value ;
    var ctx = document.getElementById('myColumnChart').getContext('2d');
    const chartData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [{
            label: 'Doanh thu ',
            backgroundColor: 'rgba(27, 89, 248, 0.2)',
            borderColor: 'rgba(27, 89, 248, 1)',
            borderWidth: 1,
            data: dataDT[selectedYear],
        }]
    };

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
// Gọi hàm updateChart() khi trang được tải lần đầu để hiển thị biểu đồ với năm đầu tiên
document.addEventListener('DOMContentLoaded', () => {
    updateChart();
});
