# Climate Action Data Trust User Interface

This repository provides a graphical user interface (UI) for the [Climate Action Data Trust (CADT)](https://github.com/Chia-Network/cadt) application.  CADT interfaces with the Chia Blockchain software and provides and API for entering and retrieving carbon data.  This UI is a javascript application that connects to the CADT API for a convenient way to access the data. 

*Note that this application was previously called the Climate Warehouse UI and that name may be used interchangeably in documentation and throughout this application.*


## Installation

The UI application can be hosted as a web application and accessed via the browser, or as a desktop application packaged with Electron.  Currently the application is only packaged for x86 platforms, though building from source is expected to work on ARM.  

### Desktop Applications

The [releases](https://github.com/Chia-Network/cadt-ui/releases) page provides desktop applications packaged for Windows, Mac, and Debian-based Linux distributions.  

#### Ubuntu Desktop via Apt

For Ubuntu-based Linux desktops the CADT UI is available for install with `apt`.  

1. Start by updating apt and allowing repository download over HTTPS:

```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

2.  Add Chia's official GPG Key (if you have installed Chia or [CADT](https://github.com/Chia-Network/cadt) with `apt`, you'll have this key already and will get a message about overwriting the existing key, which is safe to do):

```
curl -sL https://repo.chia.net/FD39E6D3.pubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg
```

3. Use the following command to setup the repository.

```
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/cadt/debian/ stable main" | sudo tee /etc/apt/sources.list.d/cadt.list > /dev/null
```

4.  Install CADT-UI

```
sudo apt-get update
sudo apt-get install cadt-ui
```


### Web Application

The CADT UI can be hosted as a web application, either for internal use, or made available to the public.  When operating as a web application, the user's browser must be able to connect to the [CADT API](https://github.com/Chia-Network/cadt).  This means the API must be available on the public internet if the UI is public.  The `READ_ONLY` option on the API should be set when running a public observer node. 

To host the UI on the web, use the [web-build.tar.gz file from the releases page](https://github.com/Chia-Network/cadt-ui/releases). One of the simplest solutions is to uncompress these files into a [public S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html). These files could also be served by any webserver, such as Nginx or Apache.  

To make the CADT UI web application automatically connect to a CADT host by default, build the application from source (`npm install && npm run build`) with the following environment variables set:

* `REACT_APP_API_HOST`:  Set to the URL of the CADT API, including the `/v1` path.  For example: `https://www.example.com:31310/v1`  
* `REACT_APP_APP_URL`:  Set to the URL of the UI application.  

### From Source

```
npm install -g react-scripts
git clone git@github.com:Chia-Network/cadt-ui.git
cd cadt-ui
nvm install 18.16.0
nvm use 18.16.0
npm install foreman -g
npm install -g husky
npm install -g prettier
npm install -g lint-staged
npm install -g git-authors-cli
npm set-script prepare "husky install"
npm run prepare

// If you are on linux or mac run
chmod ug+x .husky/*
chmod ug+x .git/hooks/*

npm run start
```

#### Prerequisites

You'll need:

- Git
- [nvm](https://github.com/nvm-sh/nvm)

  This app uses `nvm` to align node versions across development, CI and production. If you're working on Windows you should consider [nvm-windows](https://github.com/coreybutler/nvm-windows)

## Contributing

Upon your first commit, you will automatically be added to the package.json file as a contributor.

## Commiting

This repo uses a commit convention. A typical commit message might read:

```
    fix: correct home screen layout
```

The first part of this is the commit "type". The most common types are "feat" for new features, and "fix" for bugfixes. Using these commit types helps us correctly manage our version numbers and changelogs. Since our release process calculates new version numbers from our commits it is very important to get this right.

- `feat` is for introducing a new feature
- `fix` is for bug fixes
- `docs` for documentation only changes
- `style` is for code formatting only
- `refactor` is for changes to code which should not be detectable by users or testers
- `test` is for changes which only touch test files or related tooling
- `build` is for changes which only touch our develop/release tools
- `chore` is for housekeeping tasks such as hydrating from another branch

After the type and scope there should be a colon.

The "subject" of the commit follows. It should be a short indication of the change. The commit convention prefers that this is written in the present-imperative tense.

### Commit linting

Each time you commit the message will be checked against these standards in a pre-commit hook. Additionally all the commits in a PR branch will be linted before it can be merged to master.
