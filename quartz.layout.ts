import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.Navbar()],
  footer: Component.Footer({
    links: {
      "Quartz's Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

export const contributionsEnabledGrowthPiecePageLayout: PageLayout = {
  beforeBody: [
    Component.GrowthStage(),
    Component.Title(),
    Component.Subtitle(),
    Component.TagList(),
    Component.Row({ 
      hasSpacedBetweenJustification: true,
      components: [
        Component.Row({ 
          hasSpacedBetweenJustification: false,
          components: [
            Component.AuthorImageWithName(),
            Component.Contributions()
          ],
          classes: ["full-top-margin", "responsive"] 
        }),
      ]
    }),
    Component.Divider(),
    Component.Row({
      hasSpacedBetweenJustification: true,
      components: [
        Component.ReadingTime(),
        Component.Dates()
      ]
    }),
    Component.CoverImage()
  ],
  left: [],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ]
}

export const contributionsDisabledGrowthPiecePageLayout: PageLayout = {
  beforeBody: [
    Component.GrowthStage(),
    Component.Title(),
    Component.Subtitle(),
    Component.ReadingTime(),
    Component.Row({
      hasSpacedBetweenJustification: true,
      components: [
        Component.TagList({ removeTopMargin: true }),
        Component.Dates()
      ],
      classes: ["half-top-margin"]
    }),
    Component.CoverImage()
  ],
  left: [],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ]
}

export const portfolioItemPageLayout: PageLayout = {
  beforeBody: [
    Component.CoverImage(),
    Component.Title(),
    Component.Subtitle(),
    Component.Divider(),
    Component.Grid({
      components: [
        Component.Team(),
        Component.Role(),
        Component.ToolsOrTech(),
        Component.Duration(), 
      ]
    }),
    Component.TagList(),
    Component.Divider()
  ],
  left: [
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
  ],

}

export const aboutPageLayout: PageLayout = {
  beforeBody: [
    Component.Title({ useConfig: true }),
    Component.Subtitle({ useConfig: true }),
  ],
  left: [],
  right: [],
}

// components for pages that display a single page (e.g. a single note)
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
    Component.DesktopOnly(Component.Explorer({
      filterFn: (node) => {
        // Exclude tags, blogroll, portfolio, now, about, and garden folders from explorer
        return !["tags", "blogroll", "portfolio", "now", "about", "garden"].includes(node.name)
      }
    })),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Graph(),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.Title(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Explorer({
      filterFn: (node) => {
        // Exclude tags, blogroll, portfolio, now, about, and garden folders from explorer
        return !["tags", "blogroll", "portfolio", "now", "about", "garden"].includes(node.name)
      }
    })),
  ],
  right: [],
}

// components for tag pages (pages that list all pages with a given tag)
export const defaultTagPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.Title(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Explorer({
      filterFn: (node) => {
        // Exclude tags, blogroll, portfolio, now, about, and garden folders from explorer
        return !["tags", "blogroll", "portfolio", "now", "about", "garden"].includes(node.name)
      }
    })),
  ],
  right: [
    Component.Graph(),
    Component.Backlinks(),
  ],
}
