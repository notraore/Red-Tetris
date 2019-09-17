import React from 'react'
import styled from 'styled-components'

const StyledInfo = styled.div`
	font-size: 2.0rem;
	align-item: center;
	font-weight: bold;
	color: pink;
	marginTop: 0 0 20px;
	border: 4px solid pink;
	border-radius: 10px;
	padding: 7px;
`

const InGameInfos = ({text}) => (
	<StyledInfo>{text}</StyledInfo>
)

export default InGameInfos