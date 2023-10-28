import { makeStyles } from "@material-ui/styles";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
	const { root, navigation, items } = useStyles();

	return (
		<>
			<nav className={root}>
				<ul className={navigation}>
					<li className={items}>
						<Link to="/">Home</Link>
					</li>
					<li className={items}>
						<Link to="/neworder">Novo pedido</Link>
					</li>
				</ul>
			</nav>

			<Outlet />
		</>
	);
};

const useStyles = makeStyles({
	root: {
		backgroundImage: "linear-gradient(to right, #434343 0%, black 100%)",
		padding: "32px 0px",
		boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.75)",
	},
	navigation: {
		maxWidth: "1280px",
		margin: "0 auto",
		display: "flex",
		justifyContent: "space-evenly",
	},
	items: {
		listStyleType: "none",
		fontSize: "20px",
		fontWeight: 500,
		textTransform: "uppercase",
		"& a": {
			textDecoration: "none",
			color: "white",
			transition: "0.3s color",
			"&:hover": {
				color: "#f09819",
			},
		},
	},
});

export default Layout;
