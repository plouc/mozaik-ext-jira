import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    LoaderIcon,
    CheckCircleIcon,
    AlertTriangleIcon,
} from '@mozaik/ui'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2vmin 2vmin;
    height: 100%;
`

const Count = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 9vmin;
`

const Label = styled.div`
    text-align: center;
`

export default class ProjectVersionUnresolvedIssueCount extends Component {
    static propTypes = {
        client: PropTypes.string,
        projectId: PropTypes.string.isRequired,
        versionName: PropTypes.string.isRequired,
        apiData: PropTypes.object,
        apiError: PropTypes.object,
        theme: PropTypes.shape({}).isRequired,
    }

    static getApiRequest({ client = 'default', projectId, versionName }) {
        return {
            id: `jira.projectVersionUnresolvedIssueCount.${client}.${projectId}.${versionName}`,
            params: {
                clientId: client,
                projectId,
                versionName,
            },
        }
    }

    render() {
        const { versionName, apiData, apiError, theme } = this.props

        let title = ''
        let icon = LoaderIcon
        let body = <WidgetLoader />
        if (apiData && !apiError) {
            title = apiData.project.name

            let color
            let label
            if (apiData.unresolvedIssueCount === 0) {
                icon = CheckCircleIcon
                color = theme.colors.success
                label = (
                    <span>
                        no unresolved issue,
                        <br />
                        well done!
                    </span>
                )
            } else {
                icon = AlertTriangleIcon
                color = theme.colors.warning
                if (apiData.unresolvedIssueCount === 1) {
                    label = (
                        <span>
                            unresolved issue,
                            <br />
                            almost done ;)
                        </span>
                    )
                } else {
                    label = (
                        <span>
                            unresolved issues,
                            <br />
                            back to work then!
                        </span>
                    )
                }
            }

            body = (
                <Wrapper>
                    <Count style={{ color }}>{apiData.unresolvedIssueCount}</Count>
                    <Label>{label}</Label>
                </Wrapper>
            )
        }

        return (
            <Widget>
                <WidgetHeader title={title} subject={versionName} icon={icon} />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
