[![SemApps](https://badgen.net/badge/Powered%20by/SemApps/28CDFB)](https://semapps.org)

# Minicourses

## Getting started

Requirements:

- Node (v14.16 minimum)
- Yarn
- Docker and docker-compose

## Launch the backend

```
docker-compose up -d
yarn install
yarn run bootstrap
cd backend
yarn run dev
```

Moleculer will function in [REPL mode](https://moleculer.services/docs/0.14/moleculer-repl.html). You should be able to type commands such as `services` and view the results.

### Import base data

Import the base data by entering these commands:

```bash
call importer.status.freshImport
call importer.themes.freshImport
```

## Launch the frontend

```
cd frontend
yarn install
yarn start
```

## Linking to SemApps packages

To modify packages on the [SemApps repository](https://github.com/assemblee-virtuelle/semapps) and see the changes before they are published, we recommend to use [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/). The commands below will make this easier.

```bash
git clone git@github.com:assemblee-virtuelle/semapps.git
git checkout next # Minicourses currently use the packages published on the next branch
cd semapps/src/middleware
yarn run link-all
cd /MINICOURSES_REPO
yarn run link-semapps-packages
```

## Integration tests

```
yarn install
yarn run bootstrap
yarn run test
```
