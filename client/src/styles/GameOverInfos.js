import React from 'react'
import styled from 'styled-components'

const StyledGameOverInfos = styled.div`
	font-size: ${props => (props.size)};
	align-item: center;
	font-weight: bold;
	color: salmon;
	marginTop: 0 0 20px;
	padding: 3px;
`

const GameOverInfos = ({text}) => (
	<StyledGameOverInfos>{text}</StyledGameOverInfos>)

export default GameOverInfos