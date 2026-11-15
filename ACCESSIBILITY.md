# Accessibility

I want this site to work for everyone, and I aim for WCAG 2.2 level AA. It hasn't had a formal audit.

## What's in place

- **Automated checks:** every pull request runs [axe](https://github.com/dequelabs/axe-core) on the
  home page and on case-study pages, in the light and the dark theme. A violation fails the build.
- **Keyboard:** everything can be reached and used with a keyboard. There is a skip link, visible
  focus, and a command menu on `Ctrl+K` or `⌘K`.
- **Structure:** landmarks, one `h1` per page and headings in order. Dialogs use the native
  `<dialog>` element, which keeps focus inside and closes on `Esc`.
- **Motion:** animations are turned off for visitors who ask their system to reduce motion.
- **Without JavaScript:** every page is pre-rendered, so the content is readable with scripts off.
- **Languages:** English and German, with the page's language set for screen readers.
- **Small screens:** the layout is checked at phone width for sideways scrolling.

## Known limits

- The resume PDFs are made outside this project and haven't been checked for accessibility.
- The contact form uses Google reCAPTCHA, which can be hard to complete with some assistive
  technology. My email address is next to the form as another way to reach me.
- Project screenshots are small on the page. Each case-study screenshot has a caption and opens at
  full size.

## Tested with

Automated checks run in Chromium. Beyond that, the site is checked by hand with a keyboard in
current desktop browsers. It hasn't been tested with a screen reader by someone who relies on one.

## Reporting a barrier

Open an [issue](https://github.com/abdullahrather/abdullahrather.github.io/issues/new/choose) or
write to [abdullahrather19@gmail.com](mailto:abdullahrather19@gmail.com). Tell me the page, what you
were trying to do, and the browser and assistive technology you use.
