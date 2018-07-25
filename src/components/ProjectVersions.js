import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import HeaderIcon from 'react-icons/lib/md/event'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import ProjectVersionsItem from './ProjectVersionsItem'

export default class ProjectVersions extends Component {
    static propTypes = {
        projectId: PropTypes.string.isRequired,
        apiData: PropTypes.object,
        apiError: PropTypes.object,
        theme: PropTypes.shape({}).isRequired,
    }

    static getApiRequest({ client = 'default', projectId }) {
        return {
            id: `jira.project.${client}.${projectId}`,
            params: {
                clientId: client,
                projectId,
            },
        }
    }

    render() {
        const { apiData, apiError, theme } = this.props

        let subject = ''
        let count = 0
        let body = <WidgetLoader />
        if (apiData && !apiError) {
            subject = apiData.name
            count = apiData.versions.length
            body = (
                <Fragment>
                    {apiData.versions.map(version => (
                        <ProjectVersionsItem key={version.id} {...version} theme={theme} />
                    ))}
                </Fragment>
            )
        }

        return (
            <Widget>
                <WidgetHeader title="versions" subject={subject} count={count} icon={HeaderIcon} />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
