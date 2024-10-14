document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabsContent = document.querySelectorAll('.tabs-content');
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const cameraButton = document.getElementById('cameraButton');
  const captureButton = document.getElementById('captureButton');
  const submitButton = document.getElementById('submitButton');
  const ocrResult = document.getElementById('ocrResult');
  const analysisResult = document.getElementById('analysisResult');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabsContent.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(button.dataset.target).classList.add('active');
    });
  });

  cameraButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        document.querySelector('.camera-container').style.display = 'block';
      })
      .catch(err => console.error('Camera access denied:', err));
  });

  captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    ocrResult.innerHTML = `<img src="${imageDataUrl}" alt="Captured Photo" />`;

    video.srcObject.getTracks().forEach(track => track.stop());
    document.querySelector('.camera-container').style.display = 'none';
  });

  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    ocrResult.innerHTML = 'Processing OCR...';
    
    // Simulated OCR processing and analysis
    setTimeout(() => {
      ocrResult.innerHTML = 'OCR Result: Diagnosed with hypertension.';
      analysisResult.innerHTML = 'Recommended treatment: Lisinopril and lifestyle changes.';
    }, 2000);
  });
});
