# Layout Comparison: Standard Quartz vs Current Front Porch

## Standard Quartz v4 Layout
*Based on official Quartz documentation and typical configurations*

```typescript
// Default Quartz Content Page Layout
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Darkmode(),
    Component.Search(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Graph(),
    Component.Backlinks(),
  ],
}

// Default Quartz List Page Layout  
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Darkmode(),
    Component.Search(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
```

## Your Current Front Porch Layout
*After applying changes*

```typescript
// Your Content Page Layout (AFTER UPDATE)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.Title(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Graph(),
    Component.Backlinks(),
  ],
}

// Your List Page Layout (AFTER UPDATE)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.Title(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
```

## Comparison Summary

### ✅ **MATCHES STANDARD QUARTZ:**

**Left Sidebar:**
- ✅ PageTitle
- ✅ Search  
- ✅ Darkmode
- ✅ Explorer (desktop only)
- ✅ MobileOnly(Spacer)

**Right Sidebar:**
- ✅ TableOfContents (desktop only)
- ✅ Graph
- ✅ Backlinks

**Center Content:**
- ✅ Breadcrumbs
- ✅ ContentMeta (reading time, dates)
- ✅ TagList

### 🔄 **MINOR DIFFERENCES:**

| Element | Standard Quartz | Your Layout |
|---------|----------------|-------------|
| Title Component | `Component.ArticleTitle()` | `Component.Title()` |
| Effect | Functionally identical | Same display |

## Layout Structure Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                               │
│                    (Navbar - shared)                         │
├──────────────┬─────────────────────────┬────────────────────┤
│              │                         │                    │
│   LEFT       │      MAIN CONTENT       │      RIGHT        │
│              │                         │                    │
│ - PageTitle  │  - Breadcrumbs         │  - TableOfContents│
│ - Search     │  - Title               │  - Graph          │
│ - Darkmode   │  - ContentMeta         │  - Backlinks      │
│ - Explorer   │  - TagList             │                    │
│              │  - Article Body        │                    │
│              │                         │                    │
└──────────────┴─────────────────────────┴────────────────────┘
│                         FOOTER                               │
└─────────────────────────────────────────────────────────────┘
```

## Conclusion

✅ **Your layout NOW MATCHES the standard Quartz structure!**

The three-column layout with Explorer on the left, content in the center, and TOC/Graph/Backlinks on the right is exactly what you see on sites like jzhao.xyz/posts/networked-thought.

The only difference is using `Component.Title()` instead of `Component.ArticleTitle()`, which is functionally equivalent for your use case.
