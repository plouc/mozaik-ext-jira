import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReleasedIcon from 'react-icons/lib/md/check'
import OverdueIcon from 'react-icons/lib/md/watch-later'
import ArchivedIcon from 'react-icons/lib/md/card-travel'

const Container = styled.div`
    display: grid;
    grid-template-columns: 5vmin auto 3vmin 5vmin;
`

const Name = styled.div`
    display: flex;
    align-items: center;
`

const IconCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2vmin 0;
`

const Description = styled.div`
    grid-column-start: 2;
    font-size: 0.8em;
    display: flex;
    align-items: center;
`

export default class ProjectVersionsItem extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        theme: PropTypes.shape({
            colors: PropTypes.shape({
                success: PropTypes.string.isRequired,
                warning: PropTypes.string.isRequired,
            }),
        }).isRequired,
    }
    render() {
        const { name, description, theme } = this.props

        return (
            <Container>
                <IconCell style={{ gridColumnStart: 1 }}>
                    <ReleasedIcon size="2.6vmin" color={theme.colors.success} />
                </IconCell>
                <Name>{name}</Name>
                <IconCell>
                    <OverdueIcon size="2vmin" color={theme.colors.success} />
                </IconCell>
                <IconCell style={{ paddingRight: '2vmin' }}>
                    <ArchivedIcon size="2vmin" color={theme.colors.warning} />
                </IconCell>
                <Description>{description}</Description>
            </Container>
        )
    }
}
