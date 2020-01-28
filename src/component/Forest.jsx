import React from "react"
import Tree from "../images/tree.png"
import Lumberyard from "../images/lumberyard.png"

const Forest = props => <table>{props.table.map(line => <Line line={line} />)}</table>

const Line = props => <tr>{props.line.map(c => <td><Image type={c} /></td>)}</tr>

const Image = props => {
    switch (props.type) {
        case '|':
            return <img src={Tree} alt='|' />
        case '#':
            return <img src={Lumberyard} alt='#' />
        default:
            return <img alt='.' />
    }
}

export default Forest