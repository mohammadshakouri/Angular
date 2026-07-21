# SCSS (Sass) Quick Guide

## What is SCSS?

**SCSS (Sassy CSS)** is a CSS preprocessor that extends CSS with extra features, making stylesheets easier to write, organize, and maintain.

After writing SCSS, it is **compiled into standard CSS** that browsers can understand.

---

## Key Features

### 1. Variables

Store reusable values like colors, fonts, or spacing.

```scss
$primary-color: #3498db;

button {
  background: $primary-color;
}
```

---

### 2. Nesting

Write CSS in a structure that matches your HTML.

```scss
nav {
  ul {
    margin: 0;
  }

  a {
    color: blue;
  }
}
```

Compiles to:

```css
nav ul { margin: 0; }
nav a { color: blue; }
```

---

### 3. Partials & Imports

Split styles into multiple files.

```scss
// _variables.scss
$color: red;

// style.scss
@use "variables";
```

---

### 4. Mixins

Create reusable blocks of CSS.

```scss
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  @include center;
}
```

---

### 5. Functions

Return calculated values.

```scss
@function double($value) {
  @return $value * 2;
}

.box {
  width: double(20px);
}
```

---

### 6. Inheritance (`@extend`)

Reuse styles from another selector.

```scss
.button {
  padding: 10px;
}

.primary {
  @extend .button;
  background: blue;
}
```

---

### 7. Operators

Perform calculations directly.

```scss
.container {
  width: 100% - 20%;
  padding: 10px * 2;
}
```

---

### 8. Control Directives

Create dynamic styles.

```scss
@for $i from 1 through 3 {
  .col-#{$i} {
    width: $i * 25%;
  }
}
```

---

## Why Use SCSS?

* ✅ Cleaner and more organized code
* ✅ Reusable variables and mixins
* ✅ Less repetition (DRY principle)
* ✅ Easier maintenance
* ✅ Better scalability for large projects
* ✅ Supports calculations and logic

---

## SCSS vs CSS

| CSS                 | SCSS                      |
| ------------------- | ------------------------- |
| Basic styling       | Advanced styling features |
| No variables        | Variables supported       |
| No nesting          | Nested rules              |
| No mixins           | Reusable mixins           |
| Limited reusability | High reusability          |
| Manual calculations | Built-in calculations     |

---

## Common SCSS File Structure

```
scss/
│
├── _variables.scss
├── _mixins.scss
├── _buttons.scss
├── _header.scss
├── _footer.scss
└── style.scss
```

---

## Compilation

SCSS is converted into CSS before the browser uses it.

```
SCSS
   ↓
Compiler (Sass)
   ↓
CSS
   ↓
Browser
```

---

## Summary

SCSS is an enhanced version of CSS that provides:

* Variables
* Nesting
* Mixins
* Functions
* Inheritance (`@extend`)
* Mathematical operations
* Modular file organization
* Loops and conditional logic

This is a **CSS design-token setup** using **CSS custom properties**, also called CSS variables.

```scss
:root {
  --color-white: #ffffff;
  --color-black: #000000;
  --color-gray-25: #fcfcfd;
}
```

### What `:root` means

`:root` represents the top-level HTML element. Variables defined there are available throughout the entire website.

### What these variables are for

Each line gives a reusable name to a color:

```scss
--color-gray-100: #f2f4f7;
```

You can then use it anywhere with `var()`:

```scss
.card {
  background-color: var(--color-gray-25);
  border-color: var(--color-gray-200);
  color: var(--color-black);
}
```

### Is this SCSS?

The code itself is standard CSS, but it can be placed inside an `.scss` file because SCSS supports normal CSS syntax.

SCSS variables look different:

```scss
$color-white: #ffffff;
```

CSS variables look like this:

```scss
--color-white: #ffffff;
```

A key difference is that CSS variables remain available in the browser and can change at runtime:

```scss
[data-theme="dark"] {
  --color-white: #101828;
  --color-black: #ffffff;
}
```

So this block is mainly used as the **color foundation of a design system**, matching the colors defined in Figma.
