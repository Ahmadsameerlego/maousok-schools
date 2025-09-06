// Custom JavaScript for the dashboard

console.log('Checking if Chart.js is loaded:', typeof Chart !== 'undefined');

// Initialize Chart.js charts
window.addEventListener('DOMContentLoaded', () => {
    
    console.log('DOMContentLoaded event fired. Initializing charts...');

    // Line Chart: Payments Over 12 Months
    const lineChartCtx = document.getElementById('line-chart-payments').getContext('2d');
    new Chart(lineChartCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
            datasets: [{
                label: 'المدفوعات المتأخرة',
                data: [12, 19, 3, 5, 2, 3, 7, 8, 6, 4, 10, 15],
                borderColor: '#0ab3d4',
                backgroundColor: 'rgba(10, 179, 212, 0.2)',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    // Donut Chart: Suppliers by Category
    const donutChartCtx = document.getElementById('donut-chart-suppliers').getContext('2d');
    new Chart(donutChartCtx, {
        type: 'doughnut',
        data: {
            labels: ['فئة أ', 'فئة ب', 'فئة ج'],
            datasets: [{
                data: [30, 50, 20],
                backgroundColor: ['#0ab3d4', '#3bc9e1', '#0892a8'],
                hoverBackgroundColor: ['#0892a8', '#0ab3d4', '#3bc9e1']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    // Initialize Sparkline Charts for KPI Cards
    const sparklineParentsCtx = document.getElementById('sparkline-parents').getContext('2d');
    new Chart(sparklineParentsCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس'],
            datasets: [{
                data: [10, 15, 20],
                borderColor: '#0ab3d4',
                backgroundColor: 'rgba(10, 179, 212, 0.2)',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false },
                y: { display: false }
            },
            elements: {
                point: { radius: 0 }
            }
        }
    });

    const sparklineSuppliersCtx = document.getElementById('sparkline-suppliers').getContext('2d');
    new Chart(sparklineSuppliersCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس'],
            datasets: [{
                data: [5, 10, 15],
                borderColor: '#3bc9e1',
                backgroundColor: 'rgba(59, 201, 225, 0.2)',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false },
                y: { display: false }
            },
            elements: {
                point: { radius: 0 }
            }
        }
    });

    // Initialize charts for reports.html
    // Line Chart: إجمالي المدفوعات المتأخرة حسب الشهر
});

// Main JavaScript for Mothooq School Admin Dashboard

// Sidebar toggle for mobile
// const sidebarToggle = document.getElementById('sidebar-toggle');
// const sidebar = document.getElementById('sidebar');
// if (sidebarToggle) {
//     sidebarToggle.addEventListener('click', () => {
//         sidebar.classList.toggle('hidden');
//     });
// }

// // Sidebar toggle functionality for small screens
// if (sidebarToggle && sidebar) {
//     sidebarToggle.addEventListener('click', () => {
//         sidebar.classList.toggle('open');
//         if (sidebar.classList.contains('open')) {
//             sidebarToggle.textContent = '✕'; // Change to X when open
//         } else {
//             sidebarToggle.textContent = '☰'; // Change to menu icon when closed
//         }
//     });
// }

// Modal handling
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 bg-${type === 'success' ? 'green' : 'red'}-500 text-white px-4 py-2 rounded shadow`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Tabs switching
const tabs = document.querySelectorAll('[data-tab]');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        document.querySelectorAll('[data-tab-content]').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(target).classList.remove('hidden');
    });
});

// Dynamic table actions
function markAsRead(rowId) {
    const row = document.getElementById(rowId);
    if (row) {
        row.classList.add('bg-gray-100');
    }
}

function deleteRow(rowId) {
    const row = document.getElementById(rowId);
    if (row) {
        row.remove();
    }
}

// RFQ items list handling
const addItemButton = document.getElementById('add-item');
const itemsList = document.getElementById('items-list');
if (addItemButton && itemsList) {
    addItemButton.addEventListener('click', () => {
        const newItem = document.createElement('div');
        newItem.className = 'flex items-center space-x-4';
        newItem.innerHTML = `
            <input type="text" placeholder="المنتج" class="border rounded-lg px-3 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-primary-light" required>
            <input type="number" placeholder="الكمية" class="border rounded-lg px-3 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-primary-light" required>
            <input type="text" placeholder="وحدة القياس" class="border rounded-lg px-3 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-primary-light" required>
            <input type="number" placeholder="السعر التقديري" class="border rounded-lg px-3 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-primary-light" required>
            <button type="button" class="bg-red-500 text-white px-3 py-2 rounded" onclick="this.parentElement.remove()">حذف</button>
        `;
        itemsList.appendChild(newItem);
    });
}

// Chart.js initialization placeholders
window.addEventListener('DOMContentLoaded', () => {
    console.log('Initialize charts here for dashboard and reports pages.');
});

// PARENT INQUIRY: JS INIT

// Validate National ID
const nationalIdInput = document.getElementById('national-id');
const inquiryButton = document.getElementById('inquiry-button');
const errorMessage = document.getElementById('error-message');

if (nationalIdInput && inquiryButton) {
    nationalIdInput.addEventListener('input', () => {
        const value = nationalIdInput.value;
        if (/^\d{14}$/.test(value)) {
            errorMessage.classList.add('hidden');
            inquiryButton.disabled = false;
        } else {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'الرقم الوطني يجب أن يكون 14 رقمًا.';
            inquiryButton.disabled = true;
        }
    });

    inquiryButton.addEventListener('click', () => {
        // Show skeleton loader
        const skeleton = document.getElementById('skeleton-loader');
        if (skeleton) skeleton.classList.remove('hidden');

        setTimeout(() => {
            // Redirect to result page with national ID
            const nationalId = nationalIdInput.value;
            window.location.href = `parents-result.html?nid=${nationalId}`;
        }, 600);
    });
}

// Determine Parent Status
function determineParentStatus(nid) {
    const lastDigit = parseInt(nid.slice(-1), 10);
    if (lastDigit === 0) return 'موثوق';
    if (lastDigit === 1) return 'غير موثوق';
    return 'قيد المعالجة';
}

// PARENT RESULT: JS INIT
const urlParams = new URLSearchParams(window.location.search);
const nid = urlParams.get('nid');
const resultSection = document.getElementById('result-section');

// if (nid && resultSection) {
//     const status = determineParentStatus(nid);
//     resultSection.innerHTML = '';

//     if (status === 'موثوق') {
//         resultSection.innerHTML = `
//             <div class='text-center'>
//                 <h2 class='text-green-500 text-xl font-bold'>موثوق ✅</h2>
//                 <p>الرقم الوطني: ${nid}</p>
//                 <p>لا يوجد ديون.</p>
//                 <button onclick="window.history.back()" class='bg-primary text-white px-4 py-2 rounded'>رجوع</button>
//             </div>
//         `;
//     } else if (status === 'غير موثوق') {
//         resultSection.innerHTML = `
//             <div class='text-center'>
//                 <h2 class='text-red-500 text-xl font-bold'>غير موثوق ⛔</h2>
//                 <p>الرقم الوطني: ${nid}</p>
//                 <a href='assets/files/not_trusted_report.pdf' download class='bg-red-500 text-white px-4 py-2 rounded'>تحميل التقرير</a>
//             </div>
//         `;
//     } else {
//         resultSection.innerHTML = `
//             <div class='text-center'>
//                 <h2 class='text-yellow-500 text-xl font-bold'>قيد المعالجة</h2>
//                 <p>الرقم الوطني: ${nid}</p>
//                 <button onclick="location.reload()" class='bg-primary text-white px-4 py-2 rounded'>إعادة المحاولة</button>
//             </div>
//         `;
//     }
// } 
// else if (!nid) {
//     window.location.href = 'parents-inquiry.html';
// }
