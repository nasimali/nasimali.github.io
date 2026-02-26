const DEFAULT_HEADER_OFFSET = 112;

function getHeaderOffset(): number {
  const header = document.querySelector('nav');
  if (!header) {
    return DEFAULT_HEADER_OFFSET;
  }

  return header.getBoundingClientRect().height + 28;
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) {
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - getHeaderOffset();

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}
