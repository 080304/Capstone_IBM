document.addEventListener('DOMContentLoaded', async () => {
    // === Bagian untuk GET Request ===
    const apiResponseElement = document.getElementById('apiResponse');
    const nameInput = document.getElementById('nameInput');
    const greetButton = document.getElementById('greetButton');

    // Fungsi untuk memanggil API
    async function fetchGreeting(name = '') {
        try {
            const url = name ? `/api/hello?name=${encodeURIComponent(name)}` : '/api/hello';
            const response = await fetch(url);
            const data = await response.json();
            apiResponseElement.textContent = data.message;
        } catch (error) {
            console.error('Error fetching API:', error);
            apiResponseElement.textContent = 'Gagal memuat dari API.';
        }
    }

    // Panggil API saat halaman dimuat
    fetchGreeting();

    // Event listener untuk tombol sapa
    greetButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        fetchGreeting(name);
    });

    // === Bagian untuk POST Request ===
    const itemInput = document.getElementById('itemInput');
    const sendButton = document.getElementById('sendButton');
    const postResponseElement = document.getElementById('postResponse');

    sendButton.addEventListener('click', async () => {
        const item = itemInput.value.trim();
        if (!item) {
            postResponseElement.textContent = 'Masukkan item yang ingin dikirim!';
            return;
        }

        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item: item }),
            });
            const data = await response.json();
            if (response.ok) {
                postResponseElement.textContent = `API Merespon: Item diterima: "${data.received_item}"`;
            } else {
                postResponseElement.textContent = `Error dari API: ${data.error || 'Terjadi kesalahan'}`;
            }
        } catch (error) {
            console.error('Error sending data to API:', error);
            postResponseElement.textContent = 'Gagal mengirim data ke API.';
        }
    });
});