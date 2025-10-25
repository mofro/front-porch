# Asterion Campaign Archive - Refactoring Plan

**Status:** Planning Phase  
**Goal:** Transform the Asterion archive into a fully linked, semantically correct digital garden with individual entity files, proper transclusion, and GitHub Pages deployment.

---

## Phase 1: Entity File Creation

### 1.1 Characters/NPCs (High Priority)
**Status:** ✅ Fellowship Complete | ⏳ Others Pending

#### Completed:
- ✅ Fellowship player characters (6 files in `/content/asterion/characters/`)
  - Ahira, Alvion Naeeries, Ferguson MacJayne, Jos, Rupus Thatch, Vidocq
  - All have proper frontmatter tags
  - No duplicate H1 headings
  - Successfully transcluded into Dramatis-Personae.md

#### To Do:
- [ ] **Companions & Familiars** (2 entities)
  - Puddin' (Ahira's mastiff)
  - Quia (Rupus's water nymph)
  - Location: `/content/asterion/characters/companions/`

- [ ] **Allied NPCs & Craftsmen** (~15 entities)
  - Abrum, Brother Fulton, Alinor, etc.
  - Location: `/content/asterion/characters/npcs/`

- [ ] **Antagonists & Criminals** (~10 entities)
  - Big Victor, Hanmer, Lucky Pete, Child Breakers, etc.
  - Location: `/content/asterion/characters/antagonists/`

- [ ] **Organizations & Groups** (~12 entities)
  - Daughters of God, Fellowship of the Crossed Keys, etc.
  - Location: `/content/asterion/organizations/`

**Frontmatter Template for Characters:**
```yaml
---
title: [Character Name]
tags:
  - [Role: Fellowship/NPCs/Antagonists/etc]
  - [Race: Humans/Elves/Dwarves/etc]
  - [Class/Type: Warriors/Clergy/Criminals/etc]
race: [Race]
class: [Class/Profession]
status: [Active/Deceased/Unknown]
firstAppearance: [Log reference]
---
```

### 1.2 Places (Medium Priority)
**Current State:** All in single `Places-of-Asterion.md` file

#### To Do:
- [ ] **Major Locations** (~20 entities)
  - Gallia, Lutetia, Aurelian, God's Gate, Bort, etc.
  - Location: `/content/asterion/places/major/`

- [ ] **Dungeons & Adventure Sites** (~10 entities)
  - Rope Bridge Cave, Falcon Hill, etc.
  - Location: `/content/asterion/places/dungeons/`

- [ ] **Points of Interest** (~15 entities)
  - Skull & Sword Tavern, specific buildings, landmarks
  - Location: `/content/asterion/places/poi/`

**Frontmatter Template for Places:**
```yaml
---
title: [Place Name]
tags:
  - Places
  - [Type: Cities/Dungeons/Taverns/etc]
  - [Region: if applicable]
type: [City/Dungeon/Building/etc]
region: [Geographic region]
firstAppearance: [Log reference]
---
```

### 1.3 Items & Artifacts (Low Priority for Splitting)
**Current State:** Organized in category files

#### Strategy:
- [ ] **Keep as Lists:** Mundane Valuables, Potions & Scrolls
  - These remain in their current files
  - Add proper frontmatter tags to the master files
  
- [ ] **Individual Files for Named Items:**
  - Ahira's Warhammer, The Bloodleash, Alvion's Hurdy-gurdy, etc.
  - Location: `/content/asterion/items/`
  - Only for items with significant lore/history

**Frontmatter Template for Items:**
```yaml
---
title: [Item Name]
tags:
  - Items
  - [Type: Weapons/Armor/Artifacts/etc]
  - [Rarity: Common/Rare/Legendary/etc]
owner: [Current owner if applicable]
type: [Item type]
magical: [true/false]
---
```

---

## Phase 2: Cross-Link Verification & Repair

### 2.1 Link Audit
**Goal:** Find and fix all broken internal links

#### Process:
1. [ ] **Run link checker** across all markdown files
   - Tool: `npx quartz build` will show warnings
   - Or use: `grep -r "\[\[" content/asterion/ > links-audit.txt`

2. [ ] **Common issues to fix:**
   - [ ] Links to old section headers: `[[Dramatis-Personae#NPC]]` → `[[asterion/characters/npcs/NPC]]`
   - [ ] Missing `asterion/` prefix in paths
   - [ ] Capitalization mismatches
   - [ ] Links to entities that don't exist yet

3. [ ] **Update strategy:**
   - Work file-by-file through logs and master files
   - Update all entity references to point to new individual files
   - Keep old section anchors in master files for backward compatibility

### 2.2 Circular Reference Check
- [ ] Verify no infinite transclusion loops
- [ ] Check that companions link back to owners correctly
- [ ] Ensure places reference NPCs and vice versa

### 2.3 Validation
- [ ] Build site and check for warnings
- [ ] Manually test 20+ random links
- [ ] Verify graph view shows proper connections

---

## Phase 3: Semantic HTML Cleanup

### 3.1 Remove Duplicate H1 Headings
**Status:** ✅ Fellowship Complete | ⏳ All Others Pending

#### To Do:
- [ ] **Character files** - Remove `# Title` after frontmatter (use `title:` only)
- [ ] **Place files** - Same as above
- [ ] **Item files** - Same as above
- [ ] **Log files** - Remove H1, use frontmatter `title:`
- [ ] **Master files** - Keep H1s only for main sections, use H2/H3 for subsections

#### Script/Pattern:
```bash
# For each entity file:
1. Ensure frontmatter has `title:` field
2. Remove the `# Title` line immediately after frontmatter
3. Convert first content heading to `##` if needed
4. Keep Description/Notable Traits as `##`
```

### 3.2 Heading Hierarchy
- [ ] Audit all files for proper H1 → H2 → H3 progression
- [ ] No skipping levels (H1 → H3)
- [ ] Only ONE H1 per page (from frontmatter)

---

## Phase 4: Transclusion & Card Styling

### 4.1 Update Master Files
**Pattern Established:** Dramatis-Personae.md Fellowship section

#### To Apply To:
- [ ] **Dramatis-Personae.md** - All remaining sections
  - [ ] Companions & Familiars
  - [ ] Allied NPCs
  - [ ] Antagonists
  - [ ] Organizations

- [ ] **Places-of-Asterion.md** - All location categories
  - [ ] Major Cities
  - [ ] Dungeons
  - [ ] Points of Interest

- [ ] **Items files** (for named artifacts only)
  - [ ] Artifacts-&-Treasures.md (named items only)

#### Template Pattern:
```markdown
## Section Name

<h3 id="entity-name" class="anchor-only">Entity Name</h3>

![[asterion/path/to/Entity]]

---
```

### 4.2 CSS Enhancement
**Current:** `.transclude` styles for cards

#### To Do:
- [ ] Test card styling across all entity types
- [ ] Add hover effects (currently implemented)
- [ ] Consider category-specific styling:
  - Characters: Gold borders (current)
  - Places: Blue/green borders
  - Items: Purple/silver borders
- [ ] Ensure responsive design on mobile

---

## Phase 5: Log Files Integration

### 5.1 Log File Structure
**Current State:** Logs exist but need proper frontmatter and linking

#### To Do:
- [ ] **Add frontmatter to all log files:**
  ```yaml
  ---
  title: [Date] Asterion Log
  tags:
    - SessionLogs
    - Campaign
  date: YYYY-MM-DD
  sessionNumber: [number]
  ---
  ```

- [ ] **Remove H1 headings** (use title from frontmatter)

- [ ] **Create log index page:** `/content/asterion/logs/index.md`
  - Chronological list of all sessions
  - Transclusion or summary links
  - Timeline integration

### 5.2 Timeline Integration
- [ ] **Update Timeline.md** to link to individual logs
- [ ] Consider creating timeline entries as individual files
- [ ] Cross-link events to characters/places/items

### 5.3 Navigation
- [ ] Add "Previous Session / Next Session" navigation to log pages
- [ ] Create a campaign progress tracker
- [ ] Link logs from character/place/item first appearances

---

## Phase 6: Tag System Optimization

### 6.1 Tag Taxonomy
**Establish consistent tag structure:**

#### Primary Categories:
- `PlayerCharacter`, `NPC`, `Antagonist`, `Companion`
- `Place`, `City`, `Dungeon`, `Tavern`, `Landmark`
- `Item`, `Weapon`, `Armor`, `Artifact`, `Consumable`
- `Organization`, `Guild`, `Church`, `CriminalGang`
- `SessionLog`, `Timeline`, `QuestLine`

#### Secondary Tags (Descriptive):
- Race: `Humans`, `Elves`, `Dwarves`, `Giants`, `Undead`
- Class/Role: `Warriors`, `Rogues`, `Wizards`, `Clergy`, `Craftsmen`
- Status: `Active`, `Deceased`, `Allied`, `Hostile`
- Region: `Gallia`, `Lutetia`, `Northern`

### 6.2 Tag Pages Verification
- [ ] Verify all tag pages render correctly
- [ ] Check that `#Fellowship` shows all player characters
- [ ] Test category combinations (e.g., `#NPCs` + `#Craftsmen`)

---

## Phase 7: GitHub Pages Deployment

### 7.1 Repository Setup
- [ ] **Create GitHub repository:** `asterion-campaign-archive`
- [ ] **Initialize with current content:**
  ```bash
  cd /Users/MGasto000/Code/front-porch
  git init
  git add .
  git commit -m "Initial Asterion archive structure"
  git remote add origin https://github.com/[username]/asterion-campaign-archive.git
  git push -u origin main
  ```

### 7.2 GitHub Actions Workflow
- [ ] **Create `.github/workflows/deploy.yml`:**
  ```yaml
  name: Deploy Quartz to GitHub Pages
  
  on:
    push:
      branches: [main]
    workflow_dispatch:
  
  permissions:
    contents: read
    pages: write
    id-token: write
  
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: 18
        - name: Install dependencies
          run: npm install
        - name: Build Quartz
          run: npx quartz build
        - name: Upload artifact
          uses: actions/upload-pages-artifact@v2
          with:
            path: public
    
    deploy:
      needs: build
      runs-on: ubuntu-latest
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      steps:
        - name: Deploy to GitHub Pages
          id: deployment
          uses: actions/deploy-pages@v2
  ```

### 7.3 Repository Configuration
- [ ] Enable GitHub Pages in repository settings
- [ ] Set source to "GitHub Actions"
- [ ] Configure custom domain (optional)
- [ ] Add README.md with project description

### 7.4 .gitignore Configuration
- [ ] Ensure `.gitignore` includes:
  ```
  node_modules/
  .quartz-cache/
  public/
  .DS_Store
  .obsidian/
  ```

---

## Phase 8: Testing & Validation

### 8.1 Build Validation
- [ ] Run `npx quartz build` with no errors
- [ ] Check all tag pages render
- [ ] Verify graph view shows connections
- [ ] Test search functionality

### 8.2 Link Testing
- [ ] Click through 50+ random internal links
- [ ] Verify backward compatibility (old section anchors)
- [ ] Check external links (if any)

### 8.3 Visual Testing
- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Test on mobile (responsive breakpoints)
- [ ] Verify card styling on all entity types
- [ ] Check dark mode compatibility

### 8.4 Performance
- [ ] Page load times < 2s
- [ ] Graph rendering performance
- [ ] Search response time

---

## Progress Tracking

### Completed ✅
- Fellowship player characters (6 entities)
- Individual character file structure
- Transclusion with correct paths
- Invisible anchor headers
- Card styling CSS
- Tag page layout
- Semantic HTML (Fellowship only)

### In Progress 🚧
- None currently

### Not Started ⏳
- All other character entities
- Place entities
- Item entities (selective)
- Log file integration
- Cross-link repairs
- GitHub deployment

---

## Execution Order

### Week 1: Entity Creation
1. Characters (NPCs, Antagonists)
2. Organizations
3. Companions/Familiars

### Week 2: Places & Items
1. Major locations
2. Dungeons/POIs
3. Named artifacts

### Week 3: Link Repair & Cleanup
1. Cross-link audit
2. Fix all broken references
3. Remove duplicate H1s

### Week 4: Integration & Polish
1. Apply transclusion to all master files
2. Log file integration
3. Tag optimization

### Week 5: Deployment
1. GitHub repository setup
2. Actions workflow
3. Testing & validation
4. Go live!

---

## Risk Mitigation

### Backup Strategy
- [ ] Create backup of entire `/content/asterion/` directory before each phase
- [ ] Use git branches for experimental changes
- [ ] Test builds before committing

### Rollback Plan
- [ ] Keep Dramatis-Personae.md with full content until transclusion verified
- [ ] Maintain old section anchors for backward compatibility
- [ ] Document all link pattern changes

---

## Tools & Commands

### Useful Commands:
```bash
# Build and watch for changes
npx quartz build --serve

# Find all wikilinks
grep -r "\[\[" content/asterion/

# Find broken links
npx quartz build 2>&1 | grep -i "warn"

# Count entities by type
find content/asterion/characters -name "*.md" | wc -l

# Search for duplicate H1s
grep -r "^# " content/asterion/ | grep -v "^---"
```

### Automation Opportunities:
- Script to extract entities from master files
- Automated link updater
- Frontmatter generator

---

## Success Criteria

- ✅ All entities have individual files with proper frontmatter
- ✅ Zero broken internal links
- ✅ One H1 per page (semantic HTML)
- ✅ All master files use transclusion with card styling
- ✅ Tag pages show correct entity lists
- ✅ Site deployed to GitHub Pages
- ✅ Build completes with no errors
- ✅ Mobile responsive
- ✅ Search and graph functional

---

**Last Updated:** 2025-10-25  
**Next Review:** After Phase 1 completion
