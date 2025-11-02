document.addEventListener('DOMContentLoaded', () => {
    
    // --- Get Cards ---
    const generateCard = document.getElementById('generate-card');
    const pasteCard = document.getElementById('paste-card');
    const importCard = document.getElementById('import-card');

    // --- Get Modals & Forms ---
    const pasteModal = document.getElementById('paste-modal');
    const importModal = document.getElementById('import-modal');
    const pasteModalClose = document.getElementById('paste-modal-close');
    const importModalClose = document.getElementById('import-modal-close');
    const pasteForm = document.getElementById('paste-form');
    const importForm = document.getElementById('import-form');

    // --- Get UI Elements ---
    const loadingDiv = document.getElementById('loading');
    const loadingSubtext = document.getElementById('loading-subtext');
    const resultDiv = document.getElementById('result');

    // --- Show/Hide Modal Functions ---
    const showModal = (modal) => modal.classList.remove('hidden');
    const hideModal = (modal) => modal.classList.add('hidden');

    // Close modal listeners
    pasteModalClose.addEventListener('click', () => hideModal(pasteModal));
    importModalClose.addEventListener('click', () => hideModal(importModal));
    pasteModal.addEventListener('click', (e) => {
        if (e.target === pasteModal) hideModal(pasteModal);
    });
    importModal.addEventListener('click', (e) => {
        if (e.target === importModal) hideModal(importModal);
    });

    // --- Card Click Listeners ---
    
    // 1. Generate Card
    generateCard.addEventListener('click', (e) => {
        e.preventDefault();
        const topic = window.prompt("Please enter your presentation topic:", "The Future of AI");
        if (topic) {
            handleApiCall('/generate', { topic: topic }, "Generating from topic...");
        }
    });

    // 2. Paste Card
    pasteCard.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(pasteModal);
    });

    // 3. Import Card
    importCard.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(importModal);
    });

    // --- Form Submit Listeners ---

    // Paste Form
    pasteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = document.getElementById('paste-input').value;
        if (text) {
            hideModal(pasteModal);
            handleApiCall('/generate-from-text', { text: text }, "Summarizing your text...");
        } else {
            alert("Please paste some text first.");
        }
    });

    // Import Form
    importForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = document.getElementById('import-input').value;
        if (url) {
            hideModal(importModal);
            handleApiCall('/generate-from-url', { url: url }, "Scraping and summarizing URL...");
        } else {
            alert("Please enter a URL first.");
        }
    });

    // --- Reusable API Call Function ---
    async function handleApiCall(endpoint, body, loadingMessage) {
        
        // --- UI: Start Loading ---
        loadingSubtext.textContent = loadingMessage;
        loadingDiv.classList.remove('hidden');
        resultDiv.innerHTML = ''; // Clear previous results

        try {
            // --- API Call ---
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An unknown error occurred.');
            }

            // --- UI: Show Success ---
            loadingDiv.classList.add('hidden');
            const downloadLink = document.createElement('a');
            downloadLink.href = data.download_url;
            downloadLink.textContent = 'Download Your Presentation (.pptx)';
            downloadLink.download = 'ai_presentation.pptx';
            resultDiv.appendChild(downloadLink);

        } catch (error) {
            // --- UI: Show Error ---
            loadingDiv.classList.add('hidden');
            resultDiv.innerHTML = `<p style="color: red; font-weight: 600;">Error: ${error.message}</p>`;
            console.error('Error:', error);
        }
    }
});