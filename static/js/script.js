// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initNotifications();
    initToasts();
    initCharacterCounters();
    initImagePreviews();
});

/* 1. Theme Management (Dark / Light Mode) */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    
    if (!themeToggleBtn) return;
    
    // Set initial icon based on current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcon(currentTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
        showToast(`Theme changed to ${theme} mode`, 'info');
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (!themeIcon) return;
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
    }
}

/* 2. Responsive Sidebar Drawer */
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('appSidebar');
    
    if (!menuToggle || !sidebar) return;
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && e.target !== menuToggle) {
                sidebar.classList.remove('active');
            }
        }
    });
}

/* 3. Notification Dropdown and AJAX read requests */
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (!notificationBtn || !notificationDropdown) return;
    
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
        if (!notificationDropdown.contains(e.target) && e.target !== notificationBtn) {
            notificationDropdown.classList.remove('show');
        }
    });
}

function markAsRead(notificationId, element) {
    fetch(`/notifications/read/${notificationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            element.classList.remove('unread');
            element.style.opacity = '0.5';
            
            // Update badge count
            const badge = document.getElementById('notificationBadge');
            if (badge) {
                let count = parseInt(badge.textContent);
                count--;
                if (count <= 0) {
                    badge.remove();
                } else {
                    badge.textContent = count;
                }
            }
        }
    })
    .catch(error => console.error('Error marking notification read:', error));
}

/* 4. Toast Notification Manager */
function initToasts() {
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => {
        // Auto remove toast after 5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    });
}

// Function to generate runtime toasts dynamically
function showToast(message, category = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${category}`;
    
    let iconClass = 'fa-circle-info';
    if (category === 'success') iconClass = 'fa-circle-check';
    else if (category === 'danger') iconClass = 'fa-circle-exclamation';
    else if (category === 'warning') iconClass = 'fa-triangle-exclamation';
    
    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Trigger entrance animation
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // Auto dismiss
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

/* 5. Dynamic Input Character Counters */
function initCharacterCounters() {
    const textareas = document.querySelectorAll('[data-max-chars]');
    textareas.forEach(textarea => {
        const max = parseInt(textarea.getAttribute('data-max-chars'));
        
        // Find or create a character counter label below the textarea
        let label = textarea.nextElementSibling;
        if (!label || !label.classList.contains('char-counter')) {
            label = document.createElement('small');
            label.className = 'char-counter';
            label.style.color = 'var(--text-hint)';
            label.style.display = 'block';
            label.style.textAlign = 'right';
            label.style.marginTop = '4px';
            textarea.parentNode.insertBefore(label, textarea.nextSibling);
        }
        
        const updateCounter = () => {
            const current = textarea.value.length;
            label.textContent = `${current} / ${max} characters`;
            if (current > max) {
                label.style.color = 'var(--danger)';
            } else {
                label.style.color = 'var(--text-hint)';
            }
        };
        
        textarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial check
    });
}

/* 6. File Upload Previewers & Drag-Drop UI */
function initImagePreviews() {
    const fileInputs = document.querySelectorAll('input[type="file"][data-preview-id]');
    fileInputs.forEach(input => {
        const previewId = input.getAttribute('data-preview-id');
        const previewEl = document.getElementById(previewId);
        if (!previewEl) return;
        
        input.addEventListener('change', () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewEl.src = e.target.result;
                    // In case of attachments zone preview list
                    const previewZone = previewEl.closest('.upload-preview');
                    if (previewZone) {
                        previewZone.style.display = 'flex';
                        const nameEl = document.getElementById(previewId + '_name');
                        if (nameEl) nameEl.textContent = file.name;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    });
}

// Click trigger for drag and drop container
function triggerFileInput(inputId) {
    const input = document.getElementById(inputId);
    if (input) input.click();
}

/* 7. Public Grievance Tracking Widget Handler */
function searchGrievanceTracker(event) {
    event.preventDefault();
    const input = document.getElementById('trackIdInput');
    const resultBox = document.getElementById('trackResultBox');
    
    if (!input || !resultBox) return;
    
    const id = input.value.trim();
    if (!id) {
        showToast('Please enter a Grievance ID.', 'warning');
        return;
    }
    
    // Clear result box and show loader
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 24px; color: var(--primary);"></i>
            <p style="margin-top: 8px; font-size: 13px; color: var(--text-secondary);">Querying records...</p>
        </div>
    `;
    
    fetch(`/track-status?id=${id}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const g = data.data;
            let statusPillClass = 'pill-pending';
            if (g.status === 'in-progress') statusPillClass = 'pill-in-progress';
            else if (g.status === 'resolved') statusPillClass = 'pill-resolved';
            
            resultBox.innerHTML = `
                <div class="card" style="margin-top: 16px; border-left: 4px solid var(--primary); text-align: left; padding: 18px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <h4 style="font-size: 15px; font-weight: 700;">Grievance #${g.id}: ${g.title}</h4>
                        <span class="pill ${statusPillClass}">${g.status}</span>
                    </div>
                    <div style="font-size: 13px; color: var(--text-secondary); display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <div><strong>Student:</strong> ${g.student_name}</div>
                        <div><strong>Category:</strong> ${g.category}</div>
                        <div style="grid-column: span 2;"><strong>Submitted On:</strong> ${g.created_at}</div>
                    </div>
                    <div style="margin-top: 12px; text-align: right;">
                        <a href="/login" class="btn btn-text" style="font-size: 12px; padding: 4px 8px;">Log in to view details <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        } else {
            resultBox.innerHTML = `
                <div class="card" style="margin-top: 16px; border-left: 4px solid var(--danger); text-align: center; padding: 18px; color: var(--danger);">
                    <i class="fa-solid fa-circle-xmark" style="font-size: 24px; margin-bottom: 8px;"></i>
                    <p style="font-size: 14px; font-weight: 600;">${data.message}</p>
                </div>
            `;
        }
    })
    .catch(error => {
        console.error('Error tracking grievance status:', error);
        resultBox.innerHTML = `
            <div class="card" style="margin-top: 16px; border-left: 4px solid var(--danger); text-align: center; padding: 18px; color: var(--danger);">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 24px; margin-bottom: 8px;"></i>
                <p style="font-size: 13px;">An error occurred while tracking. Please try again later.</p>
            </div>
        `;
    });
}

// Generic Password Toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.password-toggle-icon');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const inputId = this.getAttribute('data-input-id');
            const input = document.getElementById(inputId);
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            }
        });
    });
});
