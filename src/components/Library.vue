<template>
  <div class="wireframe-library">
    <div class="wireframe-header">
      <div class="wireframe-title">Library</div>
      <div class="wireframe-subtitle">All resources, materials, and tools for your therapy journey</div>
    </div>
    
    <div class="wireframe-content">
      <!-- Search and Filters -->
      <div class="wireframe-section">
        <div class="wireframe-search-container">
          <div class="wireframe-search-bar">
            <div class="wireframe-search-icon">🔍</div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search resources, materials, or topics..."
              class="wireframe-search-input"
            />
            <div class="wireframe-search-clear" v-if="searchQuery" @click="clearSearch">✕</div>
          </div>
          
          <div class="wireframe-filters">
            <div class="wireframe-filter-group">
              <label class="wireframe-filter-label">Category:</label>
              <select v-model="selectedCategory" class="wireframe-filter-select">
                <option value="">All Categories</option>
                <option value="workbook">Workbooks</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="tool">Interactive Tools</option>
                <option value="template">Templates</option>
                <option value="guide">Guides</option>
              </select>
            </div>
            
            <div class="wireframe-filter-group">
              <label class="wireframe-filter-label">Program:</label>
              <select v-model="selectedProgram" class="wireframe-filter-select">
                <option value="">All Programs</option>
                <option value="cognitive-behavioral-therapy">Cognitive Behavioral Therapy</option>
                <option value="mindfulness-stress-reduction">Mindfulness & Stress Reduction</option>
                <option value="trauma-recovery-program">Trauma Recovery Program</option>
                <option value="depression-treatment-program">Depression Treatment Program</option>
                <option value="social-skills-training">Social Skills Training</option>
                <option value="anger-management-program">Anger Management Program</option>
              </select>
            </div>
            
            <div class="wireframe-filter-group">
              <label class="wireframe-filter-label">Type:</label>
              <select v-model="selectedType" class="wireframe-filter-select">
                <option value="">All Types</option>
                <option value="PDF">PDF Documents</option>
                <option value="Video">Video Content</option>
                <option value="Audio">Audio Files</option>
                <option value="Interactive">Interactive Tools</option>
                <option value="Template">Templates</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="wireframe-section">
        <div class="wireframe-results-summary">
          <div class="wireframe-results-count">
            {{ filteredResources.length }} resources found
            <span v-if="searchQuery">for "{{ searchQuery }}"</span>
          </div>
          <div class="wireframe-results-sort">
            <label class="wireframe-sort-label">Sort by:</label>
            <select v-model="sortBy" class="wireframe-sort-select">
              <option value="name">Name</option>
              <option value="program">Program</option>
              <option value="type">Type</option>
              <option value="category">Category</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Resources Grid -->
      <div class="wireframe-section">
        <div class="wireframe-resources-grid">
          <div 
            v-for="resource in paginatedResources" 
            :key="resource.id"
            class="wireframe-resource-card"
            :class="resource.category"
            @click="openResource(resource)"
          >
            <div class="wireframe-resource-header">
              <div class="wireframe-resource-icon">{{ resource.icon }}</div>
              <div class="wireframe-resource-actions">
                <div class="wireframe-resource-action" @click.stop="downloadResource(resource)">
                  ⬇️
                </div>
                <div class="wireframe-resource-action" @click.stop="bookmarkResource(resource)">
                  {{ resource.bookmarked ? '🔖' : '📌' }}
                </div>
              </div>
            </div>
            
            <div class="wireframe-resource-content">
              <div class="wireframe-resource-title">{{ resource.title }}</div>
              <div class="wireframe-resource-description">{{ resource.description }}</div>
              
              <div class="wireframe-resource-meta">
                <div class="wireframe-resource-type">{{ resource.type }}</div>
                <div class="wireframe-resource-program">{{ resource.program }}</div>
                <div class="wireframe-resource-duration" v-if="resource.duration">{{ resource.duration }}</div>
              </div>
              
              <div class="wireframe-resource-tags">
                <span 
                  v-for="tag in resource.tags" 
                  :key="tag"
                  class="wireframe-resource-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="wireframe-section" v-if="totalPages > 1">
        <div class="wireframe-pagination">
          <button 
            class="wireframe-pagination-button"
            :disabled="currentPage === 1"
            @click="currentPage = 1"
          >
            First
          </button>
          <button 
            class="wireframe-pagination-button"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Previous
          </button>
          
          <div class="wireframe-pagination-pages">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              class="wireframe-pagination-button"
              :class="{ 'wireframe-pagination-active': page === currentPage }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            class="wireframe-pagination-button"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </button>
          <button 
            class="wireframe-pagination-button"
            :disabled="currentPage === totalPages"
            @click="currentPage = totalPages"
          >
            Last
          </button>
        </div>
      </div>

      <!-- Quick Access -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Quick Access</div>
        </div>
        
        <div class="wireframe-quick-access">
          <div class="wireframe-quick-item" @click="filterByCategory('workbook')">
            <div class="wireframe-quick-icon">📖</div>
            <div class="wireframe-quick-title">Workbooks</div>
            <div class="wireframe-quick-count">{{ getCategoryCount('workbook') }}</div>
          </div>
          
          <div class="wireframe-quick-item" @click="filterByCategory('video')">
            <div class="wireframe-quick-icon">🎥</div>
            <div class="wireframe-quick-title">Videos</div>
            <div class="wireframe-quick-count">{{ getCategoryCount('video') }}</div>
          </div>
          
          <div class="wireframe-quick-item" @click="filterByCategory('audio')">
            <div class="wireframe-quick-icon">🎧</div>
            <div class="wireframe-quick-title">Audio</div>
            <div class="wireframe-quick-count">{{ getCategoryCount('audio') }}</div>
          </div>
          
          <div class="wireframe-quick-item" @click="filterByCategory('tool')">
            <div class="wireframe-quick-icon">💻</div>
            <div class="wireframe-quick-title">Tools</div>
            <div class="wireframe-quick-count">{{ getCategoryCount('tool') }}</div>
          </div>
          
          <div class="wireframe-quick-item" @click="filterByCategory('template')">
            <div class="wireframe-quick-icon">📋</div>
            <div class="wireframe-quick-title">Templates</div>
            <div class="wireframe-quick-count">{{ getCategoryCount('template') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedProgram = ref('')
const selectedType = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const itemsPerPage = 12

// All resources from all programs
const allResources = ref([
  // Cognitive Behavioral Therapy Resources
  {
    id: 'cbt-workbook',
    title: 'CBT Workbook',
    description: 'Complete workbook with exercises and worksheets for cognitive behavioral therapy',
    type: 'PDF',
    category: 'workbook',
    program: 'Cognitive Behavioral Therapy',
    icon: '📖',
    duration: '2-3 hours',
    tags: ['CBT', 'worksheets', 'exercises', 'therapy'],
    bookmarked: false
  },
  {
    id: 'thought-record-template',
    title: 'Thought Record Template',
    description: 'Template for recording and analyzing thoughts, feelings, and behaviors',
    type: 'PDF',
    category: 'template',
    program: 'Cognitive Behavioral Therapy',
    icon: '📋',
    duration: '15 min',
    tags: ['CBT', 'template', 'thoughts', 'analysis'],
    bookmarked: true
  },
  {
    id: 'relaxation-techniques-guide',
    title: 'Relaxation Techniques Guide',
    description: 'Step-by-step guide to relaxation exercises and breathing techniques',
    type: 'PDF',
    category: 'guide',
    program: 'Cognitive Behavioral Therapy',
    icon: '📖',
    duration: '30 min',
    tags: ['relaxation', 'breathing', 'stress', 'techniques'],
    bookmarked: false
  },
  {
    id: 'cbt-video-series',
    title: 'CBT Video Series',
    description: 'Comprehensive video lessons explaining CBT concepts and techniques',
    type: 'Video',
    category: 'video',
    program: 'Cognitive Behavioral Therapy',
    icon: '🎥',
    duration: '2 hours',
    tags: ['CBT', 'video', 'lessons', 'education'],
    bookmarked: false
  },
  {
    id: 'thought-challenging-tool',
    title: 'Thought Challenging Tool',
    description: 'Interactive tool to practice challenging negative thoughts',
    type: 'Interactive',
    category: 'tool',
    program: 'Cognitive Behavioral Therapy',
    icon: '💻',
    duration: '20 min',
    tags: ['CBT', 'interactive', 'thoughts', 'practice'],
    bookmarked: true
  },

  // Mindfulness & Stress Reduction Resources
  {
    id: 'mindfulness-guide',
    title: 'Mindfulness Guide',
    description: 'Comprehensive guide to mindfulness practices and meditation techniques',
    type: 'PDF',
    category: 'guide',
    program: 'Mindfulness & Stress Reduction',
    icon: '📖',
    duration: '45 min',
    tags: ['mindfulness', 'meditation', 'stress', 'wellness'],
    bookmarked: false
  },
  {
    id: 'meditation-audio-files',
    title: 'Meditation Audio Files',
    description: 'Guided meditation recordings for different mindfulness practices',
    type: 'Audio',
    category: 'audio',
    program: 'Mindfulness & Stress Reduction',
    icon: '🎧',
    duration: '1.5 hours',
    tags: ['meditation', 'audio', 'guided', 'mindfulness'],
    bookmarked: true
  },
  {
    id: 'body-scan-video',
    title: 'Body Scan Meditation Video',
    description: 'Step-by-step body scan meditation practice',
    type: 'Video',
    category: 'video',
    program: 'Mindfulness & Stress Reduction',
    icon: '🎥',
    duration: '25 min',
    tags: ['meditation', 'body scan', 'mindfulness', 'relaxation'],
    bookmarked: false
  },
  {
    id: 'breathing-exercises-tool',
    title: 'Breathing Exercises Tool',
    description: 'Interactive breathing exercise practice with visual guidance',
    type: 'Interactive',
    category: 'tool',
    program: 'Mindfulness & Stress Reduction',
    icon: '💻',
    duration: '15 min',
    tags: ['breathing', 'interactive', 'stress', 'relaxation'],
    bookmarked: false
  },

  // Trauma Recovery Program Resources
  {
    id: 'trauma-workbook',
    title: 'Trauma Recovery Workbook',
    description: 'Comprehensive workbook for trauma recovery and healing',
    type: 'PDF',
    category: 'workbook',
    program: 'Trauma Recovery Program',
    icon: '📖',
    duration: '3-4 hours',
    tags: ['trauma', 'recovery', 'healing', 'workbook'],
    bookmarked: false
  },
  {
    id: 'grounding-techniques-guide',
    title: 'Grounding Techniques Guide',
    description: 'Essential grounding techniques for trauma recovery',
    type: 'PDF',
    category: 'guide',
    program: 'Trauma Recovery Program',
    icon: '📖',
    duration: '20 min',
    tags: ['trauma', 'grounding', 'techniques', 'safety'],
    bookmarked: true
  },
  {
    id: 'trauma-video-series',
    title: 'Trauma Recovery Video Series',
    description: 'Educational videos about trauma and recovery processes',
    type: 'Video',
    category: 'video',
    program: 'Trauma Recovery Program',
    icon: '🎥',
    duration: '1.5 hours',
    tags: ['trauma', 'recovery', 'education', 'healing'],
    bookmarked: false
  },

  // Depression Treatment Program Resources
  {
    id: 'depression-workbook',
    title: 'Depression Treatment Workbook',
    description: 'Evidence-based workbook for depression treatment and management',
    type: 'PDF',
    category: 'workbook',
    program: 'Depression Treatment Program',
    icon: '📖',
    duration: '2-3 hours',
    tags: ['depression', 'treatment', 'workbook', 'therapy'],
    bookmarked: false
  },
  {
    id: 'mood-tracker-template',
    title: 'Mood Tracker Template',
    description: 'Daily mood tracking template for monitoring emotional patterns',
    type: 'PDF',
    category: 'template',
    program: 'Depression Treatment Program',
    icon: '📋',
    duration: '5 min',
    tags: ['mood', 'tracking', 'depression', 'monitoring'],
    bookmarked: true
  },
  {
    id: 'depression-video-series',
    title: 'Depression Education Videos',
    description: 'Educational videos about depression and treatment options',
    type: 'Video',
    category: 'video',
    program: 'Depression Treatment Program',
    icon: '🎥',
    duration: '1 hour',
    tags: ['depression', 'education', 'treatment', 'videos'],
    bookmarked: false
  },

  // Social Skills Training Resources
  {
    id: 'social-skills-workbook',
    title: 'Social Skills Training Workbook',
    description: 'Comprehensive workbook for developing social skills and confidence',
    type: 'PDF',
    category: 'workbook',
    program: 'Social Skills Training',
    icon: '📖',
    duration: '2 hours',
    tags: ['social skills', 'confidence', 'communication', 'training'],
    bookmarked: false
  },
  {
    id: 'conversation-starters-tool',
    title: 'Conversation Starters Tool',
    description: 'Interactive tool with conversation starters and social scenarios',
    type: 'Interactive',
    category: 'tool',
    program: 'Social Skills Training',
    icon: '💻',
    duration: '30 min',
    tags: ['social skills', 'conversation', 'interactive', 'practice'],
    bookmarked: false
  },

  // Anger Management Program Resources
  {
    id: 'anger-management-workbook',
    title: 'Anger Management Workbook',
    description: 'Workbook for understanding and managing anger effectively',
    type: 'PDF',
    category: 'workbook',
    program: 'Anger Management Program',
    icon: '📖',
    duration: '2 hours',
    tags: ['anger', 'management', 'emotions', 'control'],
    bookmarked: false
  },
  {
    id: 'anger-trigger-template',
    title: 'Anger Trigger Template',
    description: 'Template for identifying and tracking anger triggers',
    type: 'PDF',
    category: 'template',
    program: 'Anger Management Program',
    icon: '📋',
    duration: '10 min',
    tags: ['anger', 'triggers', 'tracking', 'management'],
    bookmarked: true
  },
  {
    id: 'anger-management-videos',
    title: 'Anger Management Videos',
    description: 'Video series on anger management techniques and strategies',
    type: 'Video',
    category: 'video',
    program: 'Anger Management Program',
    icon: '🎥',
    duration: '45 min',
    tags: ['anger', 'management', 'techniques', 'videos'],
    bookmarked: false
  }
])

// Computed properties
const filteredResources = computed(() => {
  let filtered = allResources.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(resource => 
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(resource => resource.category === selectedCategory.value)
  }

  // Program filter
  if (selectedProgram.value) {
    filtered = filtered.filter(resource => 
      resource.program.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === selectedProgram.value
    )
  }

  // Type filter
  if (selectedType.value) {
    filtered = filtered.filter(resource => resource.type === selectedType.value)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.title.localeCompare(b.title)
      case 'program':
        return a.program.localeCompare(b.program)
      case 'type':
        return a.type.localeCompare(b.type)
      case 'category':
        return a.category.localeCompare(b.category)
      case 'recent':
        return b.id.localeCompare(a.id) // Simple recent sort
      default:
        return 0
    }
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredResources.value.length / itemsPerPage))

const paginatedResources = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredResources.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const clearSearch = () => {
  searchQuery.value = ''
}

const filterByCategory = (category) => {
  selectedCategory.value = category
  currentPage.value = 1
}

const getCategoryCount = (category) => {
  return allResources.value.filter(resource => resource.category === category).length
}

const openResource = (resource) => {
  console.log('Opening resource:', resource.title)
  // Add resource opening logic
}

const downloadResource = (resource) => {
  console.log('Downloading resource:', resource.title)
  // Add download logic
}

const bookmarkResource = (resource) => {
  resource.bookmarked = !resource.bookmarked
  console.log('Bookmarked resource:', resource.title, resource.bookmarked)
}
</script>

<style scoped>
/* Wireframe Library Styles */
.wireframe-library {
  padding: 24px;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
}

.wireframe-header {
  margin-bottom: 32px;
  border: 2px solid #333;
  padding: 24px;
  border-radius: 4px;
  background: white;
  color: #333;
}

.wireframe-title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.wireframe-subtitle {
  color: #666;
  font-size: 18px;
  line-height: 1.5;
}

.wireframe-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.wireframe-section {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 24px;
}

.wireframe-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #333;
}

.wireframe-section-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.wireframe-search-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wireframe-search-bar {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
}

.wireframe-search-icon {
  padding: 12px 16px;
  font-size: 18px;
  color: #666;
}

.wireframe-search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 0;
  font-size: 16px;
  color: #333;
}

.wireframe-search-clear {
  padding: 12px 16px;
  cursor: pointer;
  color: #666;
  font-size: 18px;
}

.wireframe-search-clear:hover {
  color: #333;
}

.wireframe-filters {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.wireframe-filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wireframe-filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.wireframe-filter-select {
  padding: 8px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background: white;
  cursor: pointer;
}

.wireframe-results-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.wireframe-results-count {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.wireframe-results-sort {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wireframe-sort-label {
  font-size: 14px;
  color: #666;
}

.wireframe-sort-select {
  padding: 6px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background: white;
  cursor: pointer;
}

.wireframe-resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.wireframe-resource-card {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.wireframe-resource-card:hover {
  border-color: #666;
  background: #f8f8f8;
  transform: translateY(-2px);
}

.wireframe-resource-card.workbook {
  border-color: #4CAF50;
}

.wireframe-resource-card.video {
  border-color: #2196F3;
}

.wireframe-resource-card.audio {
  border-color: #FF9800;
}

.wireframe-resource-card.tool {
  border-color: #9C27B0;
}

.wireframe-resource-card.template {
  border-color: #607D8B;
}

.wireframe-resource-card.guide {
  border-color: #795548;
}

.wireframe-resource-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.wireframe-resource-icon {
  font-size: 32px;
  width: 48px;
  height: 48px;
  border: 2px solid #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wireframe-resource-actions {
  display: flex;
  gap: 8px;
}

.wireframe-resource-action {
  width: 32px;
  height: 32px;
  border: 2px solid #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.wireframe-resource-action:hover {
  background: #f0f0f0;
}

.wireframe-resource-content {
  flex: 1;
}

.wireframe-resource-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
}

.wireframe-resource-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.4;
}

.wireframe-resource-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.wireframe-resource-type {
  font-size: 12px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
}

.wireframe-resource-program {
  font-size: 12px;
  color: #666;
  font-weight: 600;
}

.wireframe-resource-duration {
  font-size: 12px;
  color: #999;
}

.wireframe-resource-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.wireframe-resource-tag {
  padding: 2px 6px;
  background: #f0f0f0;
  border: 1px solid #333;
  border-radius: 3px;
  font-size: 10px;
  color: #333;
  font-weight: 600;
}

.wireframe-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.wireframe-pagination-button {
  padding: 8px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.wireframe-pagination-button:hover:not(:disabled) {
  background: #f0f0f0;
}

.wireframe-pagination-button:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  border-color: #ccc;
}

.wireframe-pagination-button.wireframe-pagination-active {
  background: #333;
  color: white;
}

.wireframe-pagination-pages {
  display: flex;
  gap: 4px;
}

.wireframe-quick-access {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.wireframe-quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.wireframe-quick-item:hover {
  border-color: #666;
  background: #f8f8f8;
}

.wireframe-quick-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.wireframe-quick-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-quick-count {
  font-size: 12px;
  color: #666;
}

/* Responsive */
@media (max-width: 768px) {
  .wireframe-filters {
    flex-direction: column;
  }
  
  .wireframe-resources-grid {
    grid-template-columns: 1fr;
  }
  
  .wireframe-results-summary {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .wireframe-quick-access {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
