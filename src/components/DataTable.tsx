import dataFile from './example-data.json'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from '@mui/lab/TreeItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

interface TableRow {
  data: Record<string, string>
  kids: Record<string, undefined | { records: TableRow[] }>
}

const DataTable = () => {
  const renderTree = (nodes: TableRow[]) => (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      <TableRow>
        {Object.keys(nodes[0].data).map((item, i) => (
          <TableCell key={i} style={{ width: '152px', fontWeight: 'bold' }}>
            {item}
          </TableCell>
        ))}
      </TableRow>

      {nodes.map((node, index) => (
        <TreeItem
          key={index}
          nodeId={node.data.Name || node.data['Relative ID']}
          label={Object.entries(node.data).map(([key, value]) => (
            <TableCell style={{ width: '150px' }} key={key}>
              {value}
            </TableCell>
          ))}
        >
          <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {' '}
            {Object.keys(node.kids)}
          </TableCell>
          {Object.entries(node.kids).map(([key, value]) =>
            value?.records ? renderTree(value?.records) : null,
          )}
        </TreeItem>
      ))}
    </TreeView>
  )
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>{renderTree(dataFile)}</TableBody>
      </Table>
    </TableContainer>
  )
}
export default DataTable
