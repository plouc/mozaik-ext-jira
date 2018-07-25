import React from 'react'
import { shallow } from 'enzyme'
import { WidgetHeader, WidgetLoader } from '@mozaik/ui'
import Project from './../../src/components/Project'

describe('getApiRequest', () => {
    it('should return correct api request', () => {
        expect(
            Project.getApiRequest({
                projectId: 'MOZAIK',
            })
        ).toEqual({
            id: 'jira.project.default.MOZAIK',
            params: {
                clientId: 'default',
                projectId: 'MOZAIK',
            },
        })
    })

    it('should support custom client', () => {
        expect(
            Project.getApiRequest({
                client: 'custom',
                projectId: 'MOZAIK',
            })
        ).toEqual({
            id: 'jira.project.custom.MOZAIK',
            params: {
                clientId: 'custom',
                projectId: 'MOZAIK',
            },
        })
    })
})

it('should display loader if no apiData available', () => {
    const wrapper = shallow(<Project projectId="MOZAIK" />)

    expect(wrapper.find(WidgetLoader).exists()).toBeTruthy()
})

it('should display project id when no api data is available', () => {
    const wrapper = shallow(<Project projectId="MOZAIK" />)

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('subject')).toBe('MOZAIK')
})
