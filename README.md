# Andina Joyeria

## A mobile application for a jewelry shop located in Latin America.

This is an application with [Ignite](https://github.com/infinitered/ignite) stack boilerplate as its base.

## Quick Start

Nothing but your typical `npm i` or `yarn`, depending on what you got on yourself to install all the project's dependencies.

This project was done with the idea of taking advantage of [Expo](https://expo.dev/)'s pre-release feature and deploying easiness.
To start the application, run `expo start`.

### ./storybook directory

This is where your stories will be registered and where the Storybook configs will live.

### ./test directory

This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.

## Running Storybook

From the command line in your generated app's root directory, enter `yarn run storybook`
This starts up the storybook server and opens a story navigator in your browser. With your app
running, choose Toggle Storybook from the developer menu to switch to Storybook; you can then
use the story navigator in your browser to change stories.

For Visual Studio Code users, there is a handy extension that makes it easy to load Storybook use cases into a running emulator via tapping on items in the editor sidebar. Install the `React Native Storybook` extension by `Orta`, hit `cmd + shift + P` and select "Reconnect Storybook to VSCode". Expand the STORYBOOK section in the sidebar to see all use cases for components that have `.story.tsx` files in their directories.

## Running e2e tests

Read [e2e setup instructions](./e2e/README.md).
