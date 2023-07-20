
//Dữ liệu biểu đồ Doanh thu
// Dữ liệu biểu đồ cột (có thể đưa vào từ server hoặc tạo ngay tại đây)
const chartData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [{
        label: 'Doanh thu',
        backgroundColor: 'rgba(27, 89, 248, 0.2)',
        borderColor: 'rgba(27, 89, 248, 1)',
        borderWidth: 1,
        data: [500, 800, 700, 1000, 600, 900, 1200, 950, 1100, 1300, 850, 1050],
    }]
};

// Tạo biểu đồ cột
document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myColumnChart').getContext('2d');
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
});