# Integrating JavaScript for Interactive User Experience

## Objective

Enhance a static webpage with plain JavaScript using DOM manipulation, event listeners, and client-side form validation.

## Files

* `index.html` — semantic webpage structure and interactive controls.
* `style.css` — responsive UI, theme variables, menu states, validation feedback, and toast styling.
* `script.js` — event handling and dynamic behavior.

## Interactive features

1. **Responsive navigation:** toggles the mobile menu, updates `aria-expanded`, and closes the menu after a link is selected.
2. **Light/dark theme:** toggles the `dark-theme` class and updates the button label and `aria-pressed`.
3. **Live feature search:** filters cards as the user types and updates the result count.
4. **Feature-card feedback:** “Learn more” buttons show a temporary toast message.
5. **Form validation:** validates name length, email format, and message length, with inline errors and success feedback. This demo does not send or store form data.

## JavaScript concepts demonstrated

* `DOMContentLoaded`
* `querySelector` / `querySelectorAll`
* `addEventListener`
* `classList.toggle`, `add`, and `remove`
* `textContent`, `hidden`, and `dataset`
* `setAttribute` / `removeAttribute`
* `forEach`, `map`, and `every`
* `preventDefault()`, regular expressions, and timed toast dismissal

## Testing checklist

1. Open `index.html` in a browser.
2. At mobile width, open/close the menu and select a navigation link.
3. Switch between light and dark themes.
4. Search for `form`, `theme`, and a term with no match.
5. Click each “Learn more” button and confirm the toast appears.
6. Submit the form empty; confirm error messages appear.
7. Enter an invalid email and short message; confirm validation feedback.
8. Enter a valid name, email, and message of at least 10 characters; confirm the success message.
9. Test keyboard focus and viewport widths such as 1440px, 768px, 390px, and 320px.

## Implementation choices and challenges

* Kept JavaScript in a separate file and loaded it with `defer`.
* Used event listeners rather than inline event attributes.
* Used CSS classes and custom properties to update presentation.
* Added labels and live regions for accessible feedback.
* Validated on blur and input, then checked all fields again on submit.
* Used `textContent` for messages rather than injecting text as HTML.

## Conclusion

This project shows how plain JavaScript improves a static webpage through responsive navigation, theme switching, live search, contextual feedback, and form validation.

