# Figma Plugin Template: Vite + TypeScript

Simple template for creating Figma Plugins using Vite and Typescript.

<img src="assets\sample-plugin.png" alt="Sample Application Screenshot" width="400" style="border-radius: 8px;">

## How to run the plugin

1. Clone the repository or use `Use this template`.
2. Download and install <a href="https://nodejs.org/" _target="blank">Node.js</a> if you don't already have it installed.
3. Run `npm i` to install all the packages.
4. Run `npm run dev` to start the development server.
5. Launch the <a href="https://www.figma.com/downloads/" _target="blank">Figma Desktop app</a>, then go to the Figma menu: `Plugins > Development > Import plugin from manifest`
6. Select the `dist/manifest.json` file. (Do not select the `manifest.json` in the root directory).

## Release Build

To run the release build, use the following command:

```bash
npm run build
```

## Updating plugin attributes

You can update your plugin attributes in the `manifest.json` file located in the root folder. Your changes will automatically be reflected in the `manifest.json` file inside the `dist` folder as well.

## Event Manager

The current plugin setup includes a custom event manager. To use it:

1. Put your event type in `common/events/FigmaEvents.ts`.
2. Register a handler in `common/events/EventRegistry.ts`.
3. You can now call `eventManager.emit` inside your `.tsx` files.

**Note:** Only call `eventManager.emit` from your UI files, which are located in the `src/ui` directory. Any files that need to run in the main thread **must** be imported into `main.ts`.

### Architecture Note

Keep all logic that uses the `figma.` global object inside the `main.ts` file or its imported modules.

Configure window height, window width and other properties related to window in the `window.config.json` file.

### Additional Resources

- <a href="https://vite.dev/guide/">Vite Docs</a>
- <a href="https://developers.figma.com/docs/plugins/" _target="blank">Figma Docs</a>
