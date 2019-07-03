import { Theme, DefaultTheme } from "react-native-paper";

export const AlbuminColors = {
	primary: '#cddc39', // should be mat-lime palette
	accent: '#9e9e9e', // should be mat-grey palette
	error: '#ff5722', // should be mat-deep-orange
	background: '#303030',
	surface: '#424242',
	text: '#fff',
	// backdrop: '#FF0000',
	// disabled: '#00FF00',
	placeholder: 'rgba(255,255,255,0.7)',
	appbar: '#212121',
	chips: '#616161',
	
	surfaceAlpha50: 'rgba(66,66,66, 0.7)'
}

export const AlbuminTheme: Theme = {
	...DefaultTheme,
	// dark: true,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		...AlbuminColors,
	}
};

// primary - primary color for your app, usually your brand color.
// accent - secondary color for your app which complements the primary color.
// background - background color for pages, such as lists.
// surface - background color for elements containing content, such as cards.
// text - text color for content.
// disabled - color for disabled elements.
// placeholder - color for placeholder text, such as input placeholder.
// backdrop - color for backdrops of various components such as modals.