//Dữ liệu biểu đồ lượt mượn
// Dữ liệu biểu đồ cột (có thể đưa vào từ server hoặc tạo ngay tại đây)
const chartDataCol = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [{
        label: 'Lượt mượn',
        backgroundColor: 'rgba(27, 89, 248, 0.2)',
        borderColor: 'rgba(27, 89, 248, 1)',
        borderWidth: 1,
        data: [50, 80, 70, 30, 60, 90, 70, 30, 50, 80, 100, 150],
    }]
};

// Tạo biểu đồ cột
document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('mycolumnChartViews').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: chartDataCol,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});