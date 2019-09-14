export function scrollToElement(element, offset = 0) {
  const headerHeight = document.querySelector('.main-header__navbar-wrapper').offsetHeight;
  const elementTop = element.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo(0, elementTop - headerHeight - offset);
}
