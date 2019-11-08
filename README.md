# GRIT (Geniem expoRt Import Tool)

GRIT is a command line tool for exporting and importing worklogs from Tempo using [Tempo API](https://tempo-io.github.io/tempo-api-docs/)

## Usage

### Parameters

| Parameter | Required?      | Default                              | Description                                      | Possible values                  |
| --------- | -------------- | ------------------------------------ | ------------------------------------------------ | -------------------------------- |
| mode      | Yes            | export                               | Operation mode                                   | import, export                   |
| start     | Yes for export | -                                    | Start of date range to export. Format YYYY-MM-DD | 2019-01-01                       |
| end       | Yes for export | -                                    | End of date range to export. Format YYYY-MM-DD   | 2019-01-01                       |
| project   | Yes for export | DEFAULT_PROJECT environment variable | JIRA Project key to export worklogs              | BUILD, KNI                       |
| file      | Yes for import | -                                    | Exported worklog file to import                  | BUILD_2015-09-01_2015-12-31.json |

### Environment variables

| Variable           | Purpose                               | Type   | Example     |
| ------------------ | ------------------------------------- | ------ | ----------- |
| outDir             | Directory to output exported worklogs | string | './exports' |
| DEFAULT_PROJECT    | Set default project JIRA key          | string | 'XX232SS'   |
| EXPORT_TEMPO_TOKEN | Tempo API token for exporting         | string | 'XX232SS'   |
| IMPORT_TEMPO_TOKEN | Tempo API token for importing         | string | 'BUILD'     |

### Export

If using yarn.
`yarn start --start=2019-01-01 --end=2019-01-03`

Or using npm
`npm run start -- --start=2019-01-01 --end=2019-01-03`

### Import

If using yarn.
`yarn start --mode=import --file=BUILD_2015-09-01_2015-12-31.json`
Or using npm.
`npm run start -- --mode=import --file=BUILD_2015-09-01_2015-12-31.json`

## Development

This tool is developed with Typescript 3.7
Couple of other dependencies are needed also:

- minimist - for easier command line argument usage
- dotenv - for .env file usage
- node-fetch - for interacting with http services
