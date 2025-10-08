<template>
  <div class="wireframe-module-detail-page">
    <!-- Header with Navigation -->
    <div class="wireframe-module-header">
      <div class="wireframe-header-nav">
        <button class="wireframe-back-button" @click="navigateToProgram">
          ← Back to Cognitive Behavioral Therapy
        </button>
        <div class="wireframe-module-progress">
          <div class="wireframe-progress-bar">
            <div class="wireframe-progress-fill" style="width: 100%"></div>
          </div>
          <div class="wireframe-progress-text">100% Complete</div>
        </div>
      </div>
      
      <div class="wireframe-module-title-section">
        <div class="wireframe-program-title">Cognitive Behavioral Therapy Program</div>
        <div class="wireframe-module-title">{{ currentModuleData.title }}</div>
        <div class="wireframe-module-subtitle">{{ currentModuleData.description }}</div>
        <div class="wireframe-program-objective">
          <strong>Program Objective:</strong> Learn evidence-based CBT techniques to identify and challenge negative thought patterns, develop healthier thinking habits, and improve emotional well-being through structured cognitive and behavioral interventions.
        </div>
      </div>
    </div>

    <!-- Mobile Module Navigation (Horizontal) -->
    <div class="wireframe-mobile-nav">
      <div class="wireframe-mobile-nav-header">
        <div class="wireframe-mobile-nav-title">CBT Program Modules</div>
        <div class="wireframe-mobile-nav-progress">{{ Object.keys(allModules).indexOf(activeModule) + 1 }}/{{ Object.keys(allModules).length }}</div>
      </div>
      
      <div class="wireframe-mobile-nav-items">
        <div 
          v-for="(module, moduleSlug, index) in allModules" 
          :key="moduleSlug"
          :class="['wireframe-mobile-nav-item', { 'wireframe-mobile-nav-active': activeModule === moduleSlug }]"
          @click="navigateToModule(moduleSlug)"
        >
          <div class="wireframe-mobile-nav-icon">{{ index + 1 }}</div>
          <div class="wireframe-mobile-nav-content">
            <div class="wireframe-mobile-nav-title">{{ module.title }}</div>
            <div class="wireframe-mobile-nav-duration">{{ module.duration }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="wireframe-module-layout">
      <!-- Desktop Sidebar Navigation -->
      <div class="wireframe-module-sidebar">
        <div class="wireframe-sidebar-header">
          <div class="wireframe-sidebar-title">CBT Program Modules</div>
          <div class="wireframe-sidebar-progress">2/6</div>
        </div>
        
              <div class="wireframe-sidebar-sections">
                <div class="wireframe-sidebar-item wireframe-sidebar-completed" @click="navigateToModule('introduction-to-cbt')">
                  <div class="wireframe-sidebar-icon">✓</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Introduction to CBT</div>
                    <div class="wireframe-sidebar-duration">45 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item wireframe-sidebar-completed" @click="navigateToModule('identifying-negative-thoughts')">
                  <div class="wireframe-sidebar-icon">✓</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Identifying Negative Thoughts</div>
                    <div class="wireframe-sidebar-duration">60 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item" @click="navigateToModule('thought-challenging-techniques')">
                  <div class="wireframe-sidebar-icon">3</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Thought Challenging Techniques</div>
                    <div class="wireframe-sidebar-duration">50 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item" @click="navigateToModule('behavioral-experiments')">
                  <div class="wireframe-sidebar-icon">4</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Behavioral Experiments</div>
                    <div class="wireframe-sidebar-duration">55 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item" @click="navigateToModule('relapse-prevention')">
                  <div class="wireframe-sidebar-icon">5</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Relapse Prevention</div>
                    <div class="wireframe-sidebar-duration">40 min</div>
                  </div>
                </div>
              </div>
        
        <!-- Module Navigation -->
        <div class="wireframe-module-nav">
          <button class="wireframe-nav-button wireframe-nav-prev" disabled>
            ← Previous CBT Module
          </button>
          <button class="wireframe-nav-button wireframe-nav-next" @click="goToNextModule">
            Next CBT Module →
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="wireframe-module-content">
        <div class="wireframe-content-section">
          <div class="wireframe-section-content">
            <div class="wireframe-learning-content">
              <div class="wireframe-content-text">
                <h3>Mastering Thought Challenging: Your Mental Toolkit</h3>
                <p>Thought challenging is one of the most powerful tools in cognitive behavioral therapy. It's the process of examining your automatic thoughts, questioning their accuracy, and developing more balanced, realistic perspectives. Think of it as becoming a detective of your own mind - gathering evidence, examining facts, and reaching more accurate conclusions about yourself and your experiences.</p>
                
                <h3>The Evidence-Based Approach</h3>
                <p>When we're experiencing strong emotions, our thoughts often feel absolutely true. However, feelings are not facts. The evidence-based approach to thought challenging involves systematically examining the actual evidence for and against your thoughts, much like a scientist would test a hypothesis.</p>
                
                <p>Start by asking yourself: "What evidence do I have that this thought is true? What evidence do I have that it might not be true?" This simple question can reveal that many of our most distressing thoughts are based on assumptions, interpretations, or past experiences rather than current reality.</p>
                
                <h3>Common Cognitive Distortions and How to Challenge Them</h3>
                
                <h4>1. All-or-Nothing Thinking</h4>
                <p>This distortion involves seeing things in black and white, with no gray areas. You might think "I'm either perfect or a complete failure." Challenge this by looking for the middle ground. Ask yourself: "What would I tell a friend in this situation?" Most situations have multiple perspectives and outcomes.</p>
                
                <h4>2. Catastrophizing</h4>
                <p>This involves expecting the worst possible outcome and overestimating the likelihood of disaster. When you catch yourself catastrophizing, ask: "What's the worst that could realistically happen? What's the best that could happen? What's most likely to happen?" This helps you develop a more balanced perspective.</p>
                
                <h4>3. Mind Reading</h4>
                <p>This occurs when you assume you know what others are thinking, usually assuming they're thinking negatively about you. Challenge this by asking: "What evidence do I have for this assumption? What other explanations could there be for their behavior?"</p>
                
                <h4>4. Fortune Telling</h4>
                <p>This involves predicting negative future events with certainty. Challenge this by asking: "What evidence do I have that this will definitely happen? What evidence do I have that it might not happen? What have I learned from similar situations in the past?"</p>
                
                <h3>The Socratic Method: Asking the Right Questions</h3>
                <p>The Socratic method, named after the ancient Greek philosopher, involves asking a series of questions to help someone examine their beliefs more deeply. You can use this method on yourself by asking: What evidence do I have for this thought? What evidence do I have against this thought? What would I tell a friend who had this thought? What would a neutral observer say about this situation? How would I think about this situation in 5 years? What's the worst that could realistically happen? What's the best that could happen? What's most likely to happen?</p>
                
                <h3>Developing Alternative Thoughts</h3>
                <p>Once you've challenged your original thought, it's important to develop a more balanced alternative. This isn't about positive thinking or denying reality - it's about developing thoughts that are more accurate, helpful, and based on evidence.</p>
                
                <p>Good alternative thoughts are realistic, based on actual evidence rather than assumptions. They should be balanced, acknowledging both positive and negative aspects. They should be helpful, leading to more constructive emotions and behaviors. And they should be flexible, open to new information and perspectives.</p>
                
                <div class="wireframe-examples">
                  <h4>Thought Challenging in Action</h4>
                  <div class="wireframe-example-item">
                    <strong>Original Thought:</strong> "I'm a complete failure because I made a mistake at work."<br>
                    <strong>Evidence For:</strong> I did make a mistake.<br>
                    <strong>Evidence Against:</strong> I've been successful in many other areas, this is just one incident, my boss has given me positive feedback before.<br>
                    <strong>Alternative Thought:</strong> "I made a mistake, which is human. I can learn from this and continue to do good work in other areas."
                  </div>
                  <div class="wireframe-example-item">
                    <strong>Original Thought:</strong> "Everyone at the party will think I'm boring."<br>
                    <strong>Evidence For:</strong> I sometimes feel awkward in social situations.<br>
                    <strong>Evidence Against:</strong> I have friends who enjoy spending time with me, people have invited me to parties, I can't read minds.<br>
                    <strong>Alternative Thought:</strong> "I might feel awkward, but I can't know what others are thinking. I'll focus on being present and connecting with people."
                  </div>
                </div>
                
                <h3>Practice Makes Progress</h3>
                <p>Thought challenging is a skill that improves with practice. Start by identifying one or two automatic thoughts each day and practice challenging them using the techniques you've learned. Keep a thought record to track your progress and notice patterns in your thinking.</p>
                
                <p>Remember, the goal isn't to eliminate all negative thoughts - that's neither possible nor helpful. The goal is to develop more balanced, accurate thinking that serves you better in your daily life.</p>
              </div>
            </div>
          </div>
          
          <div class="wireframe-section-nav">
            <button class="wireframe-section-button wireframe-section-prev" disabled>
              ← Previous Section
            </button>
            <button class="wireframe-section-button wireframe-section-next">
              Next Section →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Module data
const currentModuleData = ref({
  title: 'Thought Challenging Techniques',
  description: 'Learn powerful techniques to challenge and reframe negative thoughts that contribute to anxiety and depression.',
  duration: '60 minutes',
  progress: 100
})

const navigateToProgram = () => {
  router.push('/program/cognitive-behavioral-therapy')
}

const navigateToModule = (moduleSlug) => {
  console.log('CBT: Navigating to module:', moduleSlug)
  const moduleRoutes = {
    'introduction-to-cbt': '/program/cognitive-behavioral-therapy/module/introduction-to-cbt',
    'identifying-negative-thoughts': '/program/cognitive-behavioral-therapy/module/identifying-negative-thoughts',
    'thought-challenging-techniques': '/program/cognitive-behavioral-therapy/module/thought-challenging-techniques',
    'behavioral-experiments': '/program/cognitive-behavioral-therapy/module/behavioral-experiments',
    'relapse-prevention': '/program/cognitive-behavioral-therapy/module/relapse-prevention'
  }
  
  const route = moduleRoutes[moduleSlug]
  console.log('CBT: Route found:', route)
  if (route) {
    router.push(route)
  } else {
    console.error('CBT: No route found for module:', moduleSlug)
  }
}

const goToNextModule = () => {
  router.push('/program/cognitive-behavioral-therapy/module/behavioral-experiments')
}

// Hide main app elements when module is open
onMounted(() => {
  const sidebar = document.querySelector('.v-navigation-drawer')
  const appBar = document.querySelector('.v-app-bar')
  
  if (sidebar) {
    sidebar.style.display = 'none'
  }
  if (appBar) {
    appBar.style.display = 'none'
  }
})

onUnmounted(() => {
  const sidebar = document.querySelector('.v-navigation-drawer')
  const appBar = document.querySelector('.v-app-bar')
  
  if (sidebar) {
    sidebar.style.display = ''
  }
  if (appBar) {
    appBar.style.display = ''
  }
})
</script>

<style scoped>
.wireframe-module-detail-page {
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  background: white;
  color: black;
  font-weight: 600;
  z-index: 9999;
  overflow-y: auto;
}
.wireframe-module-header {
  background: #f0f0f0;
  border-bottom: 2px solid #000;
  padding: 20px;
  margin-bottom: 0;
  border: 2px solid #000;
  border-radius: 4px;
  background: white;
  color: black;
  font-weight: 600;
}

.wireframe-header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.wireframe-back-button {
  background: white;
  border: 2px solid #000;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: black;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.wireframe-back-button:hover {
  background: #f0f0f0;
  transform: translateY(-1px);
}

.wireframe-module-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wireframe-progress-bar {
  width: 200px;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #000;
}

.wireframe-progress-fill {
  height: 100%;
  background: #f0f0f0;
  transition: width 0.3s ease;
}

.wireframe-progress-text {
  font-size: 14px;
  font-weight: 600;
  color: black;
}

.wireframe-program-title {
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin-bottom: 8px;
}

.wireframe-module-title {
  font-size: 32px;
  font-weight: 700;
  color: black;
  margin-bottom: 12px;
}

.wireframe-module-subtitle {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

.wireframe-program-objective {
  font-size: 14px;
  color: black;
  margin-top: 12px;
  padding: 12px;
  background: #f0f0f0;
  border: 2px solid #000;
  border-radius: 4px;
}

.wireframe-content-text p {
  color: black;
  font-weight: 600;
  margin: 20px 0;
  line-height: 1.6;
}

.wireframe-content-text h3 {
  color: black;
  font-weight: 600;
  margin: 30px 0 15px 0;
}

.wireframe-content-text h4 {
  color: black;
  font-weight: 600;
  margin: 25px 0 10px 0;
}

/* Mobile Module Navigation */
.wireframe-mobile-nav {
  display: none;
  border: 2px solid #000;
  border-radius: 4px;
  padding: 16px;
  background: white;
  margin: 0 16px 16px 16px;
}

.wireframe-mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc;
}

.wireframe-mobile-nav-title {
  font-size: 16px;
  font-weight: 700;
  color: black;
}

.wireframe-mobile-nav-progress {
  font-size: 12px;
  color: #666;
}

.wireframe-mobile-nav-items {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.wireframe-mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  flex-shrink: 0;
}

.wireframe-mobile-nav-item:hover {
  background-color: #e0e0e0;
}

.wireframe-mobile-nav-active {
  background-color: #d0d0d0;
  border-color: #000;
}

.wireframe-mobile-nav-icon {
  font-size: 14px;
  font-weight: 700;
  color: black;
}

.wireframe-mobile-nav-content {
  flex-grow: 1;
}

.wireframe-mobile-nav-title {
  font-size: 12px;
  font-weight: 600;
  color: black;
  line-height: 1.2;
}

.wireframe-mobile-nav-duration {
  font-size: 10px;
  color: #666;
}

.wireframe-module-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  height: calc(100vh - 140px);
  padding: 24px;
}

/* Mobile responsive layout */
@media (max-width: 768px) {
  .wireframe-mobile-nav {
    display: block;
  }
  
  .wireframe-module-sidebar {
    display: none;
  }
  
  .wireframe-module-layout {
    display: block;
    grid-template-columns: none;
    height: auto;
    padding: 16px;
    gap: 0;
  }
  
  .wireframe-module-content {
    width: 100%;
    margin: 0;
  }
}

.wireframe-module-sidebar {
  border: 2px solid #000;
  border-radius: 4px;
  padding: 20px;
  background: white;
  height: fit-content;
}

.wireframe-sidebar-header {
  border-bottom: 2px solid #000;
  padding-bottom: 16px;
  margin-bottom: 20px;
}

.wireframe-sidebar-title {
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin-bottom: 8px;
}

.wireframe-sidebar-progress {
  font-size: 14px;
  color: #666;
}

.wireframe-sidebar-sections {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wireframe-sidebar-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 2px solid #000;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.wireframe-sidebar-item:hover {
  background: #f0f0f0;
  border-color: #000;
}

.wireframe-sidebar-item.wireframe-sidebar-completed {
  background: #f0f0f0;
  border-color: #000;
}

.wireframe-sidebar-item.wireframe-sidebar-current {
  background: #f0f0f0;
  border-color: #000;
  font-weight: bold;
}

.wireframe-sidebar-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-weight: 700;
  color: black;
  background: white;
  border: 1px solid #000;
  border-radius: 50%;
}

.wireframe-sidebar-content {
  flex: 1;
}

.wireframe-sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: black;
  margin-bottom: 4px;
}

.wireframe-sidebar-duration {
  font-size: 12px;
  color: #666;
}

.wireframe-module-content {
  border: 2px solid #000;
  border-radius: 4px;
  padding: 24px;
  background: white;
  overflow-y: auto;
}

</style>
