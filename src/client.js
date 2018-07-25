'use strict'

const chalk = require('chalk')
const Jira = require('jira-client')

const clients = {}

/**
 * Creates a jira client instance if it doesn't exist,
 * otherwise, creates it.
 *
 * @param {string} [id='default']
 *
 * @return {JiraApi}
 */
const getClient = (id = 'default') => {
    if (clients[id] !== undefined) return clients[id]

    let envPrefix = `JIRA_`
    if (id !== 'default') {
        envPrefix += `${id.toUpperCase()}_`
    }

    const options = {
        protocol: process.env[`${envPrefix}PROTOCOL`],
        host: process.env[`${envPrefix}HOST`],
        username: process.env[`${envPrefix}USERNAME`],
        password: process.env[`${envPrefix}PASSWORD`],
        apiVersion: '2',
    }

    const strictSSL = process.env[`${envPrefix}STRICT_SSL`]
    if (strictSSL !== undefined && ['true', 'false'].includes(strictSSL)) {
        options.strictSSL = strictSSL === 'true'
    }

    if (options.host === undefined) {
        // eslint-disable-next-line no-console
        console.error(
            chalk.red(
                `jira host is undefined, please make sure the environment variable ${envPrefix}HOST is set`
            )
        )
        process.exit(1)
    }

    const client = new Jira(options)
    clients[id] = client

    return client
}

/**
 * @param {Mozaik} mozaik
 */
module.exports = mozaik => {
    return {
        project: ({ clientId, projectId }) => {
            const client = getClient(clientId)

            mozaik.logger.info(chalk.yellow(`[jira] fetching project ${projectId}`))

            return client.getProject(projectId)
        },
        projectVersionUnresolvedIssueCount: ({ clientId, projectId, versionName }) => {
            const client = getClient(clientId)

            mozaik.logger.info(
                chalk.yellow(
                    `[jira] fetching project version unresolved issue count ${projectId}: ${versionName}`
                )
            )

            let version

            return client
                .getProject(projectId)
                .then(project => {
                    const matchingVersion = project.versions.find(v => v.name === versionName)
                    if (matchingVersion === undefined) {
                        return Promise.reject(
                            `no version found for project '${projectId}' with name '${versionName}'`
                        )
                    }

                    version = {
                        ...matchingVersion,
                        project,
                    }

                    return client.getUnresolvedIssueCount(version.id)
                })
                .then(count => {
                    version.unresolvedIssueCount = count

                    return version
                })
        },
    }
}
