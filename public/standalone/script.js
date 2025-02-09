
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');

    // Toggle sidebar
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const mainContent = document.querySelector('main');
        mainContent.style.marginLeft = sidebar.classList.contains('collapsed') ? '0' : '260px';
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        const maxHeight = 200; // Maximum height before scrolling
        if (this.scrollHeight > maxHeight) {
            this.style.height = maxHeight + 'px';
            this.style.overflowY = 'auto';
        } else {
            this.style.overflowY = 'hidden';
        }
    });

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add message to UI
            const messagesContainer = document.querySelector('.messages-container');
            const messageElement = createMessageElement(message);
            if (messagesContainer) {
                messagesContainer.appendChild(messageElement);
            }
            
            // Clear input
            chatInput.value = '';
            chatInput.style.height = 'auto';
        }
    }

    // Create message element
    function createMessageElement(content) {
        const div = document.createElement('div');
        div.className = 'message py-6';
        div.innerHTML = `
            <div class="flex gap-4">
                <div class="message-avatar"></div>
                <div class="flex-1 space-y-2">
                    <div class="message-content">${content}</div>
                    <div class="message-actions"></div>
                </div>
            </div>
        `;
        return div;
    }

    // Send button click
    sendButton.addEventListener('click', sendMessage);

    // Enter key to send
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Update send button state
    chatInput.addEventListener('input', () => {
        sendButton.disabled = !chatInput.value.trim();
    });
});

