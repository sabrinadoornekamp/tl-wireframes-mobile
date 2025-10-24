# Ontspannen E-Health Program Documentation

## Overview

The "Ontspannen" (Relax) program is a structured e-health intervention designed for maximum attention and predictability. The program follows a linear progression model with 4 modules and 7 sessions, focusing on relaxation techniques and stress relief exercises.

## Program Structure

### Core Specifications
- **Program Name:** Ontspannen
- **Total Modules:** 4
- **Total Sessions:** 7
- **Progression Type:** Linear (no session can start before previous is completed)
- **Estimated Duration:** 45-50 minutes total
- **Target Audience:** Individuals seeking stress relief and relaxation techniques

### Module Breakdown

#### Module I: Fundament & Inzicht (Foundation & Insight)
**Goal:** Client understands the scientific necessity of stress and recognizes personal warning signals

- **Session 1: Starten & Het Waarom (Starting & The Why)**
  - Duration: 6 minutes theory + assignments
  - Initial Action: Coach Selection and Start Measurement (Monitor Setup)
  - Steps:
    1. Welkom: Start je Veerkracht-Streak (Welcome: Start your Resilience Streak)
    2. Spanning is een Instinct (Stress is an Instinct)
    3. Ontspanning is een Training (Relaxation is Training)

- **Session 2: Jouw Signalen & Balans (Your Signals & Balance)**
  - Duration: 7 minutes theory + assignments
  - Steps:
    1. Jouw Persoonlijke Signalen (Your Personal Signals)
    2. Balans: Draagkracht vs. Draaglast (Balance: Capacity vs. Load)

#### Module II: De Analyse & Keuzehulp (Analysis & Choice Support)
**Goal:** Client learns to categorize stress and gets the choice model for effective relaxation

- **Session 3: De Compensatie Regel (The Compensation Rule)**
  - Duration: 6 minutes theory + assignments
  - Steps:
    1. De Keuzehulp (Hoofd-Hart-Hand Model) (The Choice Helper)

- **Session 4: Snel Hulp (Hand & Hart) (Quick Help - Hand & Heart)**
  - Duration: 8 minutes theory + assignments
  - Steps:
    1. Spanning Loslaten (Progressieve Relaxatie) (Releasing Tension - Progressive Relaxation)
    2. Ontladen door Beweging (Energie Kwijt) (Discharge through Movement)

#### Module III: De Praktijk & Verdieping (Practice & Deepening)
**Goal:** Client tries out calming and cognitive exercises and assesses their effectiveness

- **Session 5: Snel Hulp (Hoofd & Hart) (Quick Help - Head & Heart)**
  - Duration: 8 minutes theory + assignments
  - Steps:
    1. Adem als Anker (Ruimte & Tellen) (Breath as Anchor)
    2. Rust in het Hoofd (Visualisatie/Mindfulness) (Calm in the Head)
    3. Oxytocine & Creatie (Sociaal/Creatief) (Oxytocin & Creation)

#### Module IV: Integratie & Gewoontevorming (Integration & Habit Formation)
**Goal:** Client consolidates learned lessons and automates the routine (Recency Effect)

- **Session 6: Consolidatie & Selectie (Consolidation & Selection)**
  - Duration: 5 minutes theory + assignments
  - Steps:
    1. Jouw Beste Oefeningen Kiezen (Choosing Your Best Exercises)

- **Session 7: Routine & Gewoonte (De Afronding) (Routine & Habit - The Conclusion)**
  - Duration: 5 minutes theory + assignments
  - Steps:
    1. Automatiseer Je Ontspanning (Routine Planner) (Automate Your Relaxation)

## Technical Implementation

### File Structure
```
/Users/sabwerk/.cursor/Navigation/
├── src/
│   ├── components/
│   │   ├── OntspannenApp.vue          # Main integration component
│   │   ├── OntspannenProgram.vue      # Program overview component
│   │   └── OntspannenSession.vue      # Individual session component
│   └── data/
│       └── ontspannen-program.json    # Program structure data
├── index.html                         # Main mobile app with integrated program
└── ONTSPANNEN_PROGRAM_DOCUMENTATION.md
```

### Key Features Implemented

#### 1. Linear Progression System
- Sessions unlock sequentially
- No session can start before previous is completed
- Progress tracking with localStorage persistence

#### 2. Coach Selection & Start Measurement
- Modal-based coach selection for Session 1
- Three coach options with different specializations
- Start measurement integration (Monitor Setup)

#### 3. Content Types & Focus Areas
- **Introduction:** Coach videos, ownership building
- **Core Explanation:** Scientific understanding, expectations
- **Exercise:** Progressive relaxation, movement, breathing
- **Assignment:** Practical application, reflection
- **Reflection:** Consolidation and personalization

#### 4. Library Links
Each session includes optional library links:
- Verdieping: De wetenschap achter de stress-cirkel
- Tips: Het verschil tussen mindfulness en ontspanningsoefeningen
- Inspiratie: Ervaringsverhaal: Terugdenken aan je Kindertijd
- Uitleg: Uitleg over de Monitor en het meten van voortgang

#### 5. Mobile-Optimized Design
- Responsive layout following existing app design
- Touch-friendly interactions
- Consistent typography (JetBrains Mono)
- Black and white color scheme with accent colors

### Integration with Existing App

The program is integrated into the existing mobile app structure:

1. **Dashboard Integration:** Ontspannen program appears in the "Working On" widget
2. **Navigation:** Dedicated program section accessible via dashboard
3. **Progress Tracking:** Integrated with existing progress system
4. **Consistent UI:** Follows existing design patterns and styling

### Content Guidelines

#### Word Limits (Following Ashcraft's Learning Theory)
- Core explanations: 350-410 words
- Short explanations: 150-200 words
- Exercise descriptions: 200-250 words
- Reflection prompts: 100 words
- Routine automation: 305 words

#### Focus Areas
- **Ownership:** Building personal commitment
- **Scientific Understanding:** Stress science education
- **Early Recognition:** Personal signal awareness
- **Balance Understanding:** Capacity vs. load
- **Choice Model:** Head-Heart-Hand framework
- **Practical Application:** Progressive relaxation, movement, breathing
- **Mental Calm:** Visualization and mindfulness
- **Social Creative:** Oxytocin and creative activities
- **Exercise Selection:** Personal effectiveness
- **Routine Automation:** Habit formation

### Usage Instructions

1. **Access Program:** Click on "Ontspannen" in the dashboard
2. **Coach Selection:** Choose a coach when starting Session 1
3. **Linear Progression:** Complete sessions in order
4. **Step Navigation:** Use Previous/Next buttons within sessions
5. **Library Access:** Use additional resources at the bottom of each session
6. **Progress Tracking:** Progress is automatically saved to localStorage

### Future Enhancements

1. **Video Integration:** Replace placeholders with actual video content
2. **Audio Exercises:** Implement guided audio exercises
3. **Progress Analytics:** Detailed progress tracking and reporting
4. **Personalization:** Adaptive content based on user preferences
5. **Social Features:** Community support and sharing
6. **Offline Support:** Download content for offline access

## Technical Notes

- Built with vanilla JavaScript for maximum compatibility
- Uses localStorage for progress persistence
- Responsive design optimized for mobile devices
- Follows existing app's design system
- Modular component structure for easy maintenance
- JSON-based content management for easy updates

## Support

For technical support or content updates, refer to the program structure in `src/data/ontspannen-program.json` and the component files in `src/components/`.
