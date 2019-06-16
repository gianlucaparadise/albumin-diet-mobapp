import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import { UserAlbum } from 'albumin-diet-types';
import { AlbumDetailNavigationParams } from './AlbumDetailScreen';
import { MyNavigationScreenOptionsGetter } from 'react-navigation-types';
import { NavigationScreenOptions } from 'react-navigation';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { AppState } from '../redux/reducers/root.reducer';
import { connect } from 'react-redux';
import { loadListeningList } from '../redux/thunks/listening-list.thunk';
import { loadListeningListNext } from '../redux/thunks/listening-list.thunk';

//#region Props
interface OwnProps extends NavigationScreenProps {
}

interface StateProps {
	albumDescriptors: UserAlbum[],
}

interface DispatchProps {
	loadListeningList: () => void,
	loadListeningListNext: () => void,
}

type Props = StateProps & DispatchProps & OwnProps;
//#endregion

interface State {
}

class MyListeningListScreen extends Component<Props, State> {
	static navigationOptions: MyNavigationScreenOptionsGetter<NavigationScreenOptions> = (navigationOptions) => {
		return {
			title: 'Listening List',
		};
	}

	constructor(props: Props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
		this.getListeningList();
	}

	getListeningList = async () => {
		this.props.loadListeningList();
	}

	/**
	 * Here I append the next page
	 */
	onPageFinishing = async () => {
		console.log('onPageFinishing');
		this.props.loadListeningListNext();
	}

	goToDetail = (albumDescriptor: UserAlbum, elementId: string) => {
		const navigationParams: AlbumDetailNavigationParams = { albumDescriptor: albumDescriptor };
		this.props.navigation.navigate('AlbumDetail', navigationParams);
	}

	render() {
		return (
			<View>
				<FlatList
					style={styles.list}
					data={this.props.albumDescriptors}
					renderItem={({ item }) => <AlbumCardWidget onPress={this.goToDetail} style={styles.listItem} albumDescriptor={item} />}
					keyExtractor={(item, index) => item.album.id}
					onEndReached={this.onPageFinishing}
					onEndReachedThreshold={5}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	list: {
		paddingLeft: 14,
		paddingRight: 14,
	},
	listItem: {
		marginTop: 7,
		marginBottom: 7,
	},
});

const mapStateToProps = (state: AppState): StateProps => ({
	albumDescriptors: state.listeningListReducer.albumDescriptors || []
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
	loadListeningList: loadListeningList,
	loadListeningListNext: loadListeningListNext,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyListeningListScreen);
