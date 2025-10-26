import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    /**
     * Front Porch 1.0.0 Configuration
     *
     * See https://github.com/DigitalGardeningCollective/front-porch/blob/main/README.md for more information.
     */
    frontPorchVersion: "1.0.0",
    // ** Add your data here **
    githubUsername: "DigitalGardeningCollective",
    gitHubFrontPorchRepoName: "front-porch",
    landingPageData: {
      authorName: "Game Master",
      authorImage: "default-author-image.png",
      intro: {
        title: "Welcome to Asterion!",
        firstLeadUp: "I'm the",
        secondLeadUp: "and this is my",
        whatIDo: ["Game Master", "World Builder", "Campaign Archive"],
      },
      showcaseItems: [
        {
          image: "default-landing-item-image.jpg",
          title: "Campaign Characters",
          description: "Meet the heroes, villains, and NPCs of Asterion",
          pathnameOrUrl: "asterion/Dramatis-Personae",
        },
        {
          image: "default-landing-item-image.jpg",
          title: "Places & Locations",
          description: "Explore the world of Asterion",
          pathnameOrUrl: "asterion/Places-of-Asterion",
        },
        {
          image: "default-landing-item-image.jpg",
          title: "Session Logs",
          description: "Follow the ongoing adventures",
          pathnameOrUrl: "asterion/Logs/Timeline",
        }
      ],
    },
    gardenPageData: {
      title: "Campaign Archive",
      whatIWriteAbout: {
        leadUp: "This archive contains campaign notes about",
        topics: ["Characters & NPCs", "Locations & Geography", "Session Chronicles", "Magical Items", "Quest Lines"],
      },
      findMeOnCopy: "You can find me on these platforms:",
      gardenAuthorImage: "default-author-image.png",
      socialLinks: {
        twitter: "https://twitter.com/join_the_DGC",
        facebook: "https://facebook.com/digitalgardeningcollective",
        github: "https://github.com/DigitalGardeningCollective",
        linkedin: null,
      },
    },
    enableFooter: false,
    // ** Refer to Quartz's Configuration Documentation: https://quartz.jzhao.xyz/configuration#general-configuration **
    pageTitle: "Asterion Campaign",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: process.env.NODE_ENV === 'production' ? "example.com" : "",  // Empty for local dev, replace with your domain for production
    ignorePatterns: ["private", "Templates", ".obsidian", "Archives", "Tools", "Source Files", "Logs-temp"],
    defaultDateType: "modified",
    theme: {
      cdnCaching: true,
      typography: {
        header: "Cinzel",
        body: "Crimson Text",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f4e4c1",
          lightgray: "#e8d5b7",
          gray: "#a89a7a",
          darkgray: "#2c2416",
          dark: "#2c2416",
          secondary: "#8b1a1a",
          tertiary: "#d4af37",
          highlight: "rgba(212, 175, 55, 0.15)",
        },
        darkMode: {
          light: "#1a1410",
          lightgray: "#2d2416",
          gray: "#6b5d47",
          darkgray: "#c9a961",
          dark: "#f4e4c1",
          secondary: "#d4af37",
          tertiary: "#8b1a1a",
          highlight: "rgba(212, 175, 55, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["git"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      // Plugin.FolderPage(), // Disabled to allow custom index.md pages in folders
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        includeEmptyFiles: false
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
