
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        sidebar: document.getElementById('sidebar'),
        sidebarToggle: document.getElementById('sidebarToggle'),
        chatInput: document.getElementById('chatInput'),
        sendButton: document.getElementById('sendButton'),
        messagesContainer: document.querySelector('.messages-container')
    };

    // Event Handlers
    function toggleSidebar() {
        elements.sidebar.classList.toggle('collapsed');
        const mainContent = document.querySelector('main');
        mainContent.style.marginLeft = elements.sidebar.classList.contains('collapsed') ? '0' : '260px';
    }

    function handleInputResize() {
        const maxHeight = 200;
        elements.chatInput.style.height = 'auto';
        elements.chatInput.style.height = Math.min(elements.chatInput.scrollHeight, maxHeight) + 'px';
        elements.chatInput.style.overflowY = elements.chatInput.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }

    function createMessageElement(content) {
        const messageHTML = `
            <div class="message py-6">
                <div class="flex gap-4">
                    <div class="message-avatar"></div>
                    <div class="flex-1 space-y-2">
                        <div class="message-content">${content}</div>
                        <div class="message-actions"></div>
                    </div>
                </div>
            </div>
        `;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = messageHTML;
        return wrapper.firstElementChild;
    }

    function sendMessage() {
        const message = elements.chatInput.value.trim();
        if (message && elements.messagesContainer) {
            elements.messagesContainer.appendChild(createMessageElement(message));
            elements.chatInput.value = '';
            elements.chatInput.style.height = 'auto';
            updateSendButton();
        }
    }

    function updateSendButton() {
        elements.sendButton.disabled = !elements.chatInput.value.trim();
    }

    // Event Listeners
    elements.sidebarToggle.addEventListener('click', toggleSidebar);
    elements.chatInput.addEventListener('input', () => {
        handleInputResize();
        updateSendButton();
    });
    elements.sendButton.addEventListener('click', sendMessage);
    elements.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
