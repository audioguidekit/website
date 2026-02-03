export interface NavItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavGroup[] = [
  {
    title: "Introduction",
    items: [
      { title: "Welcome", href: "/docs" },
      { title: "Overview", href: "/docs/getting-started/overview" },
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "First run", href: "/docs/getting-started/first-run" },
      { title: "Next steps", href: "/docs/getting-started/next-steps" },
    ],
  },
  {
    title: "Content Creation",
    items: [
      { title: "Overview", href: "/docs/content/overview" },
      { title: "Creating a guide", href: "/docs/content/creating-guide" },
      { title: "Media hosting", href: "/docs/content/media" },
      { title: "Stop Types", href: "/docs/content/stop-types" },
    ],
  },
  {
    title: "Translations",
    items: [
      { title: "Overview", href: "/docs/translations/overview" },
      { title: "Tour content", href: "/docs/translations/tour-content" },
      { title: "UI translations", href: "/docs/translations/ui" },
    ],
  },
  {
    title: "Themes",
    items: [
      { title: "Overview", href: "/docs/themes/overview" },
      { title: "Custom themes", href: "/docs/themes/custom" },
      { title: "Theme reference", href: "/docs/themes/reference" },
    ],
  },
  {
    title: "Features",
    items: [
      { title: "Offline support", href: "/docs/features/offline" },
      { title: "Feedback collection", href: "/docs/features/feedback" },
    ],
  },
  {
    title: "Deployment",
    items: [
      { title: "Overview", href: "/docs/deployment/overview" },
      { title: "Deploy to Vercel", href: "/docs/deployment/vercel" },
      { title: "Other platforms", href: "/docs/deployment/other-platforms" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Troubleshooting", href: "/docs/reference/troubleshooting" },
    ],
  },
];

export function getNavigation() {
  return docsNavigation;
}

export function flattenNavigation(): NavItem[] {
  return docsNavigation.flatMap(group => group.items);
}

export function findCurrentAndAdjacent(pathname: string) {
  const flat = flattenNavigation();
  const currentIndex = flat.findIndex(item => item.href === pathname);

  return {
    current: flat[currentIndex] || null,
    prev: currentIndex > 0 ? flat[currentIndex - 1] : null,
    next: currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null,
  };
}
