import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { Order, OrderTableData, StatusOrderEnum } from "./EnhancedTableModels";
import { getComparator, stableSort } from "./EnhancedTableUtils";
import EnhancedTableHead from "./EnhancedTableHead";
import { Chip } from "@mui/material";

interface EnhancedTableProps {
	rows: OrderTableData[];
}

export default function EnhancedTable({ rows }: EnhancedTableProps) {
	const [order, setOrder] = React.useState<Order>("desc");
	const [orderBy, setOrderBy] =
		React.useState<keyof OrderTableData>("lastUpdate");
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof OrderTableData
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			stableSort(rows as any, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage]
	);

	const renderStatus = (status: StatusOrderEnum) => {
		switch (status) {
			case StatusOrderEnum.canceled:
				return <Chip label="Cancelado" color="warning" />;
			case StatusOrderEnum.failed:
				return <Chip label="Falha" color="error" />;
			case StatusOrderEnum.inProgress:
				return <Chip label="Em andamento" color="info" />;
			case StatusOrderEnum.success:
				return <Chip label="Sucesso" color="success" />;
			default:
				return <Chip label="Em andamento" color="info" />;
		}
	};

	const renderActionIcon = (status: StatusOrderEnum, batchId: string) => {
		switch (status) {
			case StatusOrderEnum.inProgress:
				return (
					<Link to={`/edit/order/${batchId}`}>
						<EditIcon />
					</Link>
				);
			default:
				return (
					<Link to={`/edit/order/${batchId}`}>
						<RemoveRedEye />
					</Link>
				);
		}
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={"medium"}
					>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event) =>
											handleClick(event, row.responsible as string)
										}
										tabIndex={-1}
										key={row.responsible}
										sx={{ cursor: "pointer" }}
									>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="normal"
										>
											{row.batchId}
										</TableCell>
										<TableCell align="left">{row.responsible}</TableCell>
										<TableCell align="left">{row.size}</TableCell>
										<TableCell align="left">{row.lastUpdate}</TableCell>
										<TableCell align="left">
											{renderStatus(row.status as StatusOrderEnum)}
										</TableCell>
										<TableCell align="left">
											{renderActionIcon(
												row.status as StatusOrderEnum,
												row.batchId as string
											)}
										</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
