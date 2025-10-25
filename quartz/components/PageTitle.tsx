import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "page-title-wrapper")}>
      <a href={baseDir} class="logo-link">
        <img src={`${baseDir}/images/image.png`} alt="Asterion Logo" class="sidebar-logo" />
      </a>
      <h1 class="page-title">
        <a href={baseDir}>{title}</a>
      </h1>
    </div>
  )
}

PageTitle.css = `
.page-title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.logo-link {
  display: block;
  max-width: 100%;
}

.sidebar-logo {
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sidebar-logo:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.page-title {
  margin: 0;
  text-align: center;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
