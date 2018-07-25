import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import HeaderIcon from 'react-icons/lib/md/info'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'

const Description = styled.div`
    padding: 1vmin 2vmin 2vmin;
`

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
        const { apiData, apiError } = this.props

        let title = ''
        let body = <WidgetLoader />
        if (apiData && !apiError) {
            title = apiData.name
            body = <Description>{apiData.description}</Description>
        }

        return (
            <Widget>
                <WidgetHeader title={title} icon={HeaderIcon} />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
