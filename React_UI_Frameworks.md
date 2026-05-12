# React UI Frameworks

## Tailwind Integration
- Tailwind works well with React because class-based styling fits JSX naturally.
- Use utility classes directly in `className`.
- It is good for fast iteration and consistent spacing.

### Practical Notes
- Keep class strings readable.
- Consider helper libraries for merging conditional classes.
- Use components to avoid repeating large utility bundles.

## Material UI
Material UI is a component library built around the Material Design system.

### Why People Use It
- polished ready-made components
- strong accessibility defaults
- theming support
- consistent UI system

### Deep Notes
- Components often accept `sx` for inline theme-aware styling.
- Theme customization is a major strength.
- MUI provides layout, form, navigation, feedback, and data display components.
- It is useful when you want speed plus a consistent enterprise-friendly UI.

### Common MUI Building Blocks
- `Button`
- `TextField`
- `AppBar`
- `Drawer`
- `Dialog`
- `Card`
- `Grid`
- `Stack`
- `Typography`

## ShadCN UI
- ShadCN UI is a component pattern/library built on top of accessible primitives.
- It is optional, but very useful for modern React apps.
- It often pairs with Tailwind and Radix primitives.

### Why It Feels Popular
- highly customizable
- visually clean
- composable
- good fit for app-style interfaces

### Practical Mindset
- Use it when you want full control over the design system.
- Treat components as copyable building blocks in your codebase rather than a black box.







