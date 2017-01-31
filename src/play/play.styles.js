import { StyleSheet } from 'aphrodite';
import { bannerShadow, hoverText, lightGrey, grey } from 'styleHub';

export default StyleSheet.create({
	sideBar: {
		...bannerShadow,
		background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('images/BannerWood.jpg')",
		left: 0,
		top: '72px',
		bottom: 0,
		width: '114px',
		position: "fixed",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		padding: "36px 6px 12px 6px",
		color: "#DDD",
	},
	sideBarCategory: {
		fontSize: "18px",
		marginBottom: "24px",
	},
	links: {
		paddingLeft: "12px",
	},
	sideBarLink: {
		...hoverText,
		width: "100%",
		color: grey,
		boxSizing: "border-box",
		cursor: "pointer",
		fontSize: "15px",
		marginBottom: "12px",
	},
	deckName: {
		color: lightGrey,
		fontWeight: "bold",
	},
	disabledLink: {
		width: "100%",
		color: "#999",
		boxSizing: "border-box",
		textAlign: "center",
	},
})
