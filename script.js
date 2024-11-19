const qrInput = document.getElementById("qrInput");
const qrSize = document.getElementById("qrSize");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const qrCanvas = document.getElementById("qrCanvas");

// Function to clear the QR code
const clearQRCode = () => {
  const context = qrCanvas.getContext("2d");
  context.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
  downloadBtn.disabled = true; // Disable the download button
};

// Generate QR Code
generateBtn.addEventListener("click", () => {
  const value = qrInput.value.trim();
  const size = parseInt(qrSize.value) || 200;

  if (value) {
    QRCode.toCanvas(qrCanvas, value, { width: size }, (error) => {
      if (error) {
        console.error("QR Code generation failed:", error);
        alert("Failed to generate QR Code. Please try again.");
      } else {
        downloadBtn.disabled = false; // Enable the download button
      }
    });
  } else {
    clearQRCode();
    alert("Input is empty. Please enter a value for the QR Code.");
  }
});

// Clear QR code if the input becomes empty
qrInput.addEventListener("input", () => {
  if (!qrInput.value.trim()) {
    clearQRCode();
  }
});

// Download QR Code
downloadBtn.addEventListener("click", () => {
  const qrDataUrl = qrCanvas.toDataURL("image/png");
  const downloadLink = document.createElement("a");
  downloadLink.href = qrDataUrl;
  downloadLink.download = "qrcode.png";
  downloadLink.click();
});
