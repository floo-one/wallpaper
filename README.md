# Life Calendar Wallpaper Generator

A stateless API and web interface to generate dynamic Life Calendar wallpapers for your devices. 

Designed specifically to be used with iPhone shortcuts for automatic wallpaper updates, visualizing the weeks of your life.

**Website:** [wallpaper.floo.one](https://wallpaper.floo.one)

## Features
- Generate a dynamic Life Calendar visualizing elapsed and remaining weeks.
- Stateless API architecture for quick and easy image generation.
- Device mockup previews in the browser.
- Built with Nuxt, Nuxt UI, Tailwind CSS, and NAPI-RS Canvas.

## Usage

### Web Interface
Visit the website at [wallpaper.floo.one](https://wallpaper.floo.one) to preview the generated wallpaper on different device mockups. You can interact with the options on the site to see how the calendar will look for your specific birthdate.

### Automation (Shortcuts)
Because the wallpaper generation is completely stateless, you can easily set up an iOS Shortcut (or similar automation on other operating systems) to fetch a fresh image periodically (e.g., every Monday) and set it as your wallpaper.

1. Create a shortcut that fetches the image from the API endpoint using your specific parameters (such as birthdate).
2. Use the "Set Wallpaper" action in Shortcuts to apply the fetched image to your lock screen or home screen.
3. Set up a Personal Automation in the Shortcuts app to run this shortcut automatically on a schedule (e.g., weekly).

## Local Development

Make sure to install the dependencies:

```bash
pnpm install
```

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```
