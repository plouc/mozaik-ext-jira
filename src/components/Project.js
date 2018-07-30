import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader, InfoIcon } from '@mozaik/ui'

export default class Project extends Component {
    static propTypes = {
        client: PropTypes.string,
        projectId: PropTypes.string.isRequired,
        apiData: PropTypes.object,
        apiError: PropTypes.object,
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
        const { projectId, apiData, apiError } = this.props

        let subject = projectId
        let body = <WidgetLoader />
        if (apiData && !apiError) {
            subject = apiData.name
            body = <Fragment>{apiData.description}</Fragment>
        }

        return (
            <Widget>
                <WidgetHeader subject={subject} icon={InfoIcon} />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
