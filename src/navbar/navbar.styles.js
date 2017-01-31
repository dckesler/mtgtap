import { commonBox, hoverText, bannerShadow } from 'styleHub';
import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
	navbar: {
		...commonBox,
		...bannerShadow,
		position: "fixed",
		right: 0,
		top: 0,
		left: 0,
		height: "54px",
		display: "flex",
		fontSize: "24px",
		color: "#CCC",
		alignItems: "center",
		backgroundImage: `url("./images/BannerWood.jpg")`,
		zIndex: 1000000,
		paddingRight: "18px",
	},
	link: {
		...hoverText,
		margin: "0 36px",
	},
	logo: {
		display: "flex",
		alignItems: "center",
		marginRight: "54px",
	},
	logoTitle: {
		fontSize: "36px",
		marginRight: "10px",
	},
	logoImage: {
		width: "48px",
	},
});
