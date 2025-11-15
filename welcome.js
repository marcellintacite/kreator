const apiKeyInput = document.getElementById("apiKeyInput");
const projectIdInput = document.getElementById("projectIdInput");
const authDomainInput = document.getElementById("authDomainInput");
const storageBucketInput = document.getElementById("storageBucketInput");
const saveBtn = document.getElementById("saveBtn");
const skipBtn = document.getElementById("skipBtn");
const status = document.getElementById("status");

// Load existing credentials if any
chrome.storage.local.get(["firebaseConfig"], (res) => {
  if (res.firebaseConfig) {
    const config = res.firebaseConfig;
    apiKeyInput.value = config.apiKey || "";
    projectIdInput.value = config.projectId || "";
    authDomainInput.value = config.authDomain || "";
    storageBucketInput.value = config.storageBucket || "";
  }
});

// Save Firebase credentials
saveBtn.addEventListener("click", () => {
  const apiKey = apiKeyInput.value.trim();
  const projectId = projectIdInput.value.trim();
  const authDomain = authDomainInput.value.trim();
  const storageBucket = storageBucketInput.value.trim();

  if (!apiKey || !projectId || !authDomain || !storageBucket) {
    showStatus("Veuillez remplir tous les champs.", "error");
    return;
  }

  const firebaseConfig = {
    apiKey,
    projectId,
    authDomain,
    storageBucket
  };

  chrome.storage.local.set({ firebaseConfig }, () => {
    showStatus("✓ Configuration enregistrée !", "success");
    setTimeout(() => {
      window.close();
    }, 1500);
  });
});

// Skip button
skipBtn.addEventListener("click", () => {
  chrome.storage.local.set({ setupSkipped: true }, () => {
    window.close();
  });
});

// Helper function to show status
function showStatus(message, type) {
  status.textContent = message;
  status.className = `show ${type}`;
}

// Allow Enter key to save
[apiKeyInput, projectIdInput, authDomainInput, storageBucketInput].forEach(input => {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveBtn.click();
    }
  });
});
