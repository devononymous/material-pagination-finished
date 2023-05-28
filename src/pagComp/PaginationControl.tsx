import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PagController from "./PagController";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
interface ApiResponse {
  username: string;
  id: number;
  email: any;
  name: string;
  title: string;
  completed: boolean;
}

export default class PaginationControl extends PagController {
  render() {
    const { todos, currentPage, totalPages } = this.state;
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">User Id</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(todos) &&
              todos.map((item: any) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{item.title}</TableCell>
                  <TableCell align="right">{item.completed}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Stack spacing={2}>
          <Typography>
            {currentPage} of {totalPages} records
          </Typography>
          <Pagination
            count={totalPages}
            color="secondary"
            page={currentPage}
            onChange={this.handleChange}
          />
        </Stack>
      </TableContainer>
    );
  }
}
