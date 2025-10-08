<template>
  <div class="mobile-chat">
    <!-- Mobile Content Header -->
    <div class="mobile-content-header">
      <h1 class="mobile-page-title">Chat</h1>
      <div class="mobile-subtitle">Connect with your support team</div>
    </div>

    <!-- New Chat Button -->
    <div class="mobile-new-chat-section">
      <v-btn 
        color="primary" 
        size="large" 
        class="mobile-new-chat-btn"
        @click="startNewChat"
      >
        <v-icon>mdi-plus</v-icon>
        New Chat
      </v-btn>
    </div>

    <!-- Conversations List -->
    <div class="mobile-conversations">
      <h3 class="mobile-section-title">Recent Conversations</h3>
      <div class="mobile-conversation-list">
        <div 
          class="mobile-conversation-item" 
          v-for="conversation in conversations" 
          :key="conversation.id"
          @click="openConversation(conversation.id)"
        >
          <div class="mobile-conversation-avatar">
            <v-icon :color="conversation.avatarColor">{{ conversation.avatarIcon }}</v-icon>
          </div>
          <div class="mobile-conversation-content">
            <div class="mobile-conversation-header">
              <div class="mobile-conversation-name">{{ conversation.name }}</div>
              <div class="mobile-conversation-time">{{ conversation.lastMessageTime }}</div>
            </div>
            <div class="mobile-conversation-preview">{{ conversation.lastMessage }}</div>
            <div class="mobile-conversation-status" :class="conversation.status">
              {{ conversation.statusText }}
            </div>
          </div>
          <div class="mobile-conversation-indicator" v-if="conversation.unreadCount > 0">
            <v-badge :content="conversation.unreadCount" color="red">
              <v-icon>mdi-circle</v-icon>
            </v-badge>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input Section (when in conversation) -->
    <div class="mobile-chat-input-section" v-if="activeConversation">
      <div class="mobile-chat-input-container">
        <v-textarea
          v-model="newMessage"
          placeholder="Type your message..."
          variant="outlined"
          rows="2"
          class="mobile-chat-input"
          auto-grow
        ></v-textarea>
        <v-btn 
          color="primary" 
          class="mobile-send-btn"
          @click="sendMessage"
          :disabled="!newMessage.trim()"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- Mobile Bottom Spacing -->
    <div class="mobile-bottom-spacing"></div>
  </div>
</template>

<script>
export default {
  name: 'MobileChat',
  data() {
    return {
      activeConversation: null,
      newMessage: '',
      conversations: [
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          lastMessage: 'How are you feeling today?',
          lastMessageTime: '2 hours ago',
          avatarIcon: 'mdi-account',
          avatarColor: '#4a90e2',
          status: 'online',
          statusText: 'Online',
          unreadCount: 2
        },
        {
          id: 2,
          name: 'Therapy Support Team',
          lastMessage: 'Your progress report is ready',
          lastMessageTime: '1 day ago',
          avatarIcon: 'mdi-account-group',
          avatarColor: '#4caf50',
          status: 'offline',
          statusText: 'Offline',
          unreadCount: 0
        },
        {
          id: 3,
          name: 'Emergency Support',
          lastMessage: 'We are here 24/7 if you need help',
          lastMessageTime: '3 days ago',
          avatarIcon: 'mdi-phone',
          avatarColor: '#f44336',
          status: 'available',
          statusText: 'Available',
          unreadCount: 0
        }
      ]
    }
  },
  methods: {
    startNewChat() {
      // Handle starting a new chat
      console.log('Starting new chat')
      this.$router.push('/chat/new')
    },
    openConversation(conversationId) {
      this.activeConversation = conversationId
      // Navigate to conversation view
      this.$router.push(`/chat/${conversationId}`)
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        // Handle sending message
        console.log('Sending message:', this.newMessage)
        this.newMessage = ''
      }
    }
  }
}
</script>

<style scoped>
.mobile-chat {
  padding: 16px;
  padding-bottom: 100px;
  background: #f5f5f5;
  min-height: 100vh;
}

.mobile-content-header {
  margin-bottom: 24px;
  text-align: center;
}

.mobile-page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.mobile-subtitle {
  font-size: 14px;
  color: #666;
}

.mobile-new-chat-section {
  margin-bottom: 24px;
}

.mobile-new-chat-btn {
  width: 100%;
  height: 48px !important;
  border: 2px solid #333 !important;
  text-transform: none !important;
  font-weight: 500 !important;
}

.mobile-conversations {
  margin-bottom: 24px;
}

.mobile-section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.mobile-conversation-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-conversation-item {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-conversation-item:hover {
  border-color: #4a90e2;
  background: #f8f9ff;
}

.mobile-conversation-avatar {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  border-radius: 50%;
  flex-shrink: 0;
}

.mobile-conversation-content {
  flex: 1;
  min-width: 0;
}

.mobile-conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.mobile-conversation-name {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.mobile-conversation-time {
  font-size: 12px;
  color: #666;
}

.mobile-conversation-preview {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-conversation-status {
  font-size: 10px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 8px;
  text-transform: uppercase;
  display: inline-block;
}

.mobile-conversation-status.online {
  background: #e8f5e8;
  color: #4caf50;
}

.mobile-conversation-status.offline {
  background: #f5f5f5;
  color: #666;
}

.mobile-conversation-status.available {
  background: #e3f2fd;
  color: #4a90e2;
}

.mobile-conversation-indicator {
  flex-shrink: 0;
}

.mobile-chat-input-section {
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background: white;
  border-top: 2px solid #333;
  padding: 16px;
  z-index: 100;
}

.mobile-chat-input-container {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.mobile-chat-input {
  flex: 1;
}

.mobile-send-btn {
  height: 40px !important;
  min-width: 40px !important;
  border: 2px solid #333 !important;
}

.mobile-bottom-spacing {
  height: 20px;
}

/* Wireframe styling */
.mobile-chat * {
  box-sizing: border-box;
}

.mobile-chat {
  font-family: 'Roboto', sans-serif;
}
</style>
