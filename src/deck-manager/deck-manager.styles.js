import { StyleSheet } from 'aphrodite';
import { input, hoverText, bannerShadow, standardButton, modalShadow, modalBox, styleIt } from 'styleHub';

export default StyleSheet.create({
	deckManager: {
		paddingLeft: "120px",
	},
	deckManagerBar: {
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
		padding: "12px 0px",
	},
	sideBarLink: {
		...hoverText,
		width: "100%",
		color: "#CCC",
		boxSizing: "border-box",
		cursor: "pointer",
		textAlign: "center",
		padding: "6px",
	},
	disabledLink: {
		width: "100%",
		color: "#999",
		boxSizing: "border-box",
		textAlign: "center",
		padding: "6px",
	},
	modalShadow,
	modalBox,
	modalInput: {
		...input,
	},
	modalButton: {
		...standardButton,
	}
})
