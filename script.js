// افزودن آیتم جدید
document.getElementById('addBtn').addEventListener('click', function() {
    const text = prompt('متن آیتم جدید را وارد کنید:');
    if (text) {
        const checklist = document.querySelector('.checklist');
        const newItem = document.createElement('div');
        newItem.className = 'item';
        
        const id = 'item' + (document.querySelectorAll('.item').length + 1);
        
        newItem.innerHTML = `
            <input type="checkbox" id="${id}">
            <label for="${id}">${text}</label>
        `;
        
        checklist.appendChild(newItem);
        saveChecklist();
    }
});

// بازنشانی چک لیست
document.getElementById('resetBtn').addEventListener('click', function() {
    if(confirm('آیا مطمئن هستید می‌خواهید تمام تیک‌ها را بازنشانی کنید؟')) {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        localStorage.removeItem('checklistState');
    }
});

// ذخیره وضعیت چک‌لیست
function saveChecklist() {
    const items = [];
    document.querySelectorAll('.item').forEach(item => {
        const label = item.querySelector('label').textContent;
        const checked = item.querySelector('input').checked;
        items.push({ label, checked });
    });
    
    localStorage.setItem('checklistState', JSON.stringify(items));
}

// بارگذاری وضعیت ذخیره شده
function loadChecklist() {
    const savedData = localStorage.getItem('checklistState');
    if (savedData) {
        const items = JSON.parse(savedData);
        
        items.forEach((item, index) => {
            if (index >= 3) { // آیتم‌های بیشتر از ۳ تا
                const checklist = document.querySelector('.checklist');
                const newItem = document.createElement('div');
                newItem.className = 'item';
                
                const id = 'item' + (index + 1);
                
                newItem.innerHTML = `
                    <input type="checkbox" id="${id}" ${item.checked ? 'checked' : ''}>
                    <label for="${id}">${item.label}</label>
                `;
                
                checklist.appendChild(newItem);
            } else { // آیتم‌های اولیه
                const checkbox = document.getElementById('item' + (index + 1));
                if (checkbox) checkbox.checked = item.checked;
            }
        });
    }
}

// ذخیره خودکار هنگام تغییر تیک‌ها
document.querySelector('.checklist').addEventListener('change', function(e) {
    if (e.target.matches('input[type="checkbox"]')) {
        saveChecklist();
    }
});

// بارگذاری اولیه
window.addEventListener('DOMContentLoaded', loadChecklist);