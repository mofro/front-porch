import { i18n } from "../i18n"
import { FullSlug, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
    const tempTitle = fileData.frontmatter?.["name-to-title"] ? 
      `${cfg.landingPageData.authorName.split(" ")[0]}'s ${fileData.frontmatter?.title}` : 
      fileData.frontmatter?.title
    const title = tempTitle ?? i18n(cfg.locale).propertyDefaults.title
    const description =
      fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description
    const { css, js } = externalResources

    // Ensure baseUrl is never empty for URL construction
    const baseUrlForUrl = cfg.baseUrl && cfg.baseUrl.trim() !== "" ? cfg.baseUrl : "example.com"
    const url = new URL(`https://${baseUrlForUrl}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const iconPath = joinSegments(baseDir, `static/author-image/${cfg.gardenPageData.gardenAuthorImage}`)
    const coverImage = fileData.frontmatter?.["cover-image"]
    const ogImagePath = `https://${baseUrlForUrl}/static/${coverImage && typeof coverImage == "string" ? 
                        `item-cover/${coverImage}` :
                        "og-image.png"
                      }`

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
          </>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImagePath} />
        <meta property="og:width" content="1200" />
        <meta property="og:height" content="675" />
        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
        {css.map((href) => (
          <link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />
        ))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
