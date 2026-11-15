# Security policy

## Reporting a problem

Please don't open a public issue. Use GitHub's private vulnerability reporting: on the repository's
**Security** tab, choose **Report a vulnerability**. If you can't use it, write to
[abdullahrather19@gmail.com](mailto:abdullahrather19@gmail.com).

Include what you found, how to reproduce it, and what it could be used for. I aim to answer within
a week.

## What's covered

The code in this repository and the site it builds, [abdullahrather.com](https://abdullahrather.com).
The site is static: there is no server, no database and no accounts. Only the latest release is
supported.

Useful reports include:

- a way to run script on the site, or to change what a visitor sees
- a secret committed to the repository
- a vulnerable dependency that ends up in what visitors download
- Google Analytics loading before a visitor agrees to it

## What isn't covered

The site uses services I don't run. Problems in them belong with their owners:

| Service | Used for | Report to |
|---|---|---|
| GitHub Pages | Hosting, TLS and response headers | GitHub |
| EmailJS | Sending the contact form | EmailJS |
| Google reCAPTCHA | Protecting the contact form | Google |
| Google Analytics | Visitor statistics, only after consent | Google |

The EmailJS public key and the reCAPTCHA site key appear in the site's code by design. Both are
meant to be public, and neither can send email or pass a check on its own.

Because the site is hosted on GitHub Pages, it can't set its own HTTP headers. Reports about missing
headers, such as `Content-Security-Policy` or `Strict-Transport-Security`, describe a limit of the
host and can't be fixed here.
