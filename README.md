This is a cap stone project for reporting and managing bugs, features, and tasks which help manage a project's life cycle from beginning to end. The project is open-source, so feel free to clone the project and/or use the app and use it for your own use.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

or

**[Go to app site](https://bug-tracker-delta.vercel.app/)**

## Status: Version 1 - Alpha Development

### v1.2

Integration of a new client database, PouchDB, for increased storage capacity. The previous version uses cookies to store the data which can only hold 4k of data. PouchDB uses IndexedDB which has at least, 5Mb to 50% of storage disk space, depending on the browser used.

- [x] migrate from Cookies to PouchDB.

### v1.1

With the basic layout and design laid out, it's time to program the basic features and combine them with the design into a working program. Here are the list of basic features that's currently in development:

- [x] Add projects
- [x] Add tasks in respective project
- [x] Remove tasks from respective project
- [x] Storing project data
- [x] Moving tasks from one panel to the next
- [x] Setting and storing card properties
  - [x] priority
  - [x] description

Now, the overall aesthetics isn't going to be pretty but the app itself does work. You can go ahead and clone the project or visit the app [here](https://bug-tracker-delta.vercel.app/). The marked out features are ready to go.

> ## <del>Research and Wireframing</del> **(DONE)**
>
> The project is currently undergoing research for possible features to add into the application. It will simultaneously undergo wireframing to sort out the flow and user experience of the app.
