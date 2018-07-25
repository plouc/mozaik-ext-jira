# Mozaïk jira widgets

[![NPM version][npm-image]][npm-url]
[![Travis CI][travis-image]][travis-url]
[![License][license-image]][license-url]

- [client configuration](#client-configuration)
- widgets
  - [Project](#project)
  - [ProjectVersions](#projectversions)
  - [ProjectVersionUnresolvedIssueCount](#projectversionunresolvedissuecount)

## Client Configuration

In order to use the Mozaïk jira widgets, you must configure its **client**.
Configuration is loaded from environment variables.

| env key          | required | default                | description
|------------------|----------|------------------------|----------------------------
| JIRA_PROTOCOL    | no       | 'http'                 | `http` or `https`
| JIRA_HOST        | yes      |                        | jira host (without protocol)
| JIRA_USERNAME    | yes      |                        | username for auth
| JIRA_PASSWORD    | yes      |                        | password for auth

You also have the ability to use multiple clients, you'll have to
set the `client` parameter on your widget:

```yaml
dashboards:
-
  title: '@mozaik/ext-jira demo'
  # …
  widgets:
  -
    # will use 'default' client, JIRA_* environment variables
    extension: jira
    widget:    Project
    # …
  -
    # will use 'other' client, JIRA_OTHER_* environment variables
    extension: jira
    widget:    Project
    client:    other <— HERE IT IS
    # …
```

when you define the `client` property, the loaded environment variables
must have the form `JIRA_<uppercased_client_id>_<key>`, for example:

- JIRA_OTHER_PROTOCOL
- JIRA_OTHER_HOST
- …

## Project

> Display information about jira project.

### parameters

key         | required | description
------------|----------|---------------------
`projectId` | yes      | *ID of the project*

## ProjectVersions

> List jira project's versions.

### parameters

key         | required | description
------------|----------|---------------------
`projectId` | yes      | *ID of the project*

## ProjectVersionUnresolvedIssueCount

> Display count of unresolved issues for a given project version.

### parameters

key           | required | description
--------------|----------|---------------------
`projectId`   | yes      | *ID of the project*
`versionName` | yes      | *name of the project's version*

[npm-image]: https://img.shields.io/npm/v/@mozaik/ext-jira.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@mozaik/ext-jira
[travis-image]: https://img.shields.io/travis/plouc/mozaik-ext-jira.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/mozaik-ext-jira
[license-image]: https://img.shields.io/github/license/plouc/mozaik-ext-jira.svg?style=flat-square
[license-url]: https://github.com/plouc/mozaik-ext-jira/blob/master/LICENSE.md
