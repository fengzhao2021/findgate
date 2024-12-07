let count = 0;
const numberDisplay = document.querySelector('.number-display');
const redBox = document.querySelector('.red-box');
let isRolling = false;  // 防止动画期间重复点击

// 生成1-8的随机数
function getRandomNumber() {
    return Math.floor(Math.random() * 8) + 1;
}

// 点击事件处理
redBox.addEventListener('click', () => {
    if (isRolling) return;  // 如果正在滚动，忽略点击
    
    isRolling = true;
    const finalNumber = getRandomNumber();  // 提前生成最终数字
    
    // 添加点击效果
    redBox.classList.add('clicked');
    setTimeout(() => redBox.classList.remove('clicked'), 200);
    
    // 开始滚动动画
    const rollInterval = setInterval(() => {
        numberDisplay.textContent = getRandomNumber();
    }, 100);  // 每100ms更新一次数字
    
    // 3秒后停止动画并显示最终数字
    setTimeout(() => {
        clearInterval(rollInterval);
        numberDisplay.textContent = finalNumber;
        isRolling = false;  // 允许再次点击
    }, 3000);
}); 

// 上传按钮和模态框功能
const uploadBtn = document.querySelector('.upload-btn');
const modal = document.querySelector('.modal');
const uploadArea = document.querySelector('.upload-area');
const qrUpload = document.querySelector('#qrUpload');
const previewQR = document.querySelector('#previewQR');

uploadBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

uploadArea.addEventListener('click', () => {
    qrUpload.click();
});

qrUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewQR.src = e.target.result;
            previewQR.style.display = 'block';
            uploadArea.querySelector('.upload-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}); 