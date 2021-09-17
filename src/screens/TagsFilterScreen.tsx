import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { TagDescriptor } from "albumin-diet-types";
import TagChip from '../widgets/TagChip';
import { AlbuminColors } from '../Theme';
import { MyAlbumsNavigationParams } from './MyAlbumsScreen';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers/root.reducer';
import { loadTags } from '../redux/thunks/tag.thunk';
import { DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';

const UNTAGGED_NAME = 'Untagged';
const UNTAGGED_ID = 'untagged';

//#region Props
interface StateProps {
  tags: TagDescriptor[];
}

interface DispatchProps {
  loadTags: () => void;
}

type Props = DrawerContentComponentProps<DrawerContentOptions> & DispatchProps & StateProps;
//#endregion

// const getActiveRouteState = function (route: NavigationState): NavigationState {
//   if (
//     !route.routes ||
//     route.routes.length === 0 ||
//     route.index >= route.routes.length
//   ) {
//     return route;
//   }

//   const childActiveRoute = route.routes[route.index] as NavigationState;
//   return getActiveRouteState(childActiveRoute);
// };

function TagsFilterScreen(props: Props) {

  const [selectedTags, setSelectedTags] = useState<TagDescriptor[]>([])

  useEffect(() => {
    props.loadTags();
  }, [])

  useEffect(() => {
    modifyTags(props.tags);
  }, [props.tags])

  /**
   * This method appends the Untagged tag updates the selected prop with the correct state
   */
  const modifyTags = (allTags?: TagDescriptor[]) => {
    try {
      // TODO: should this be in thunk or actions?
      // Injecting the Untagged special tag
      if (allTags && allTags.length > 0) {
        const hasUntaggedTag =
          allTags.findIndex((t) => t.tag.uniqueId === UNTAGGED_ID) >= 0;

        if (!hasUntaggedTag) {
          const untaggedTag: TagDescriptor = {
            tag: { name: UNTAGGED_NAME, uniqueId: UNTAGGED_ID },
            count: 1,
          };
          allTags.unshift(untaggedTag);
        }
      }

      console.log('Tags:');
      console.log(allTags);
    } catch (error) {
      console.error('Error while retrieving tags');
      console.error(error);
    }
  };

  const onOkPress = () => {
    let showUntagged = false;
    const tagIds = selectedTags.reduce(
      (accumulator, tagDescriptor) => {
        // If Untagged is selected, I don't add it as a tag, but I remember it in a boolean
        if (tagDescriptor.tag.name === UNTAGGED_NAME) {
          showUntagged = true;
          return accumulator;
        }

        accumulator.push(tagDescriptor.tag.uniqueId);
        return accumulator;
      },
      [] as string[],
    );

    const navigationParams: MyAlbumsNavigationParams = {
      tags: tagIds,
      untagged: showUntagged,
    };

    // TODO: RN5 get active screen
    // const activeRoute = getActiveRouteState(this.props.navigation.state);
    // const navigateAction = NavigationActions.setParams({
    //   params: navigationParams,
    //   key: activeRoute.key,
    // });
    // this.props.navigation.dispatch(navigateAction);
    props.navigation.closeDrawer();
  };

  const isTagSelected = (tagDescriptor: TagDescriptor): boolean => {
    return (
      selectedTags.findIndex(
        (t) => t.tag.uniqueId === tagDescriptor.tag.uniqueId,
      ) >= 0
    );
  };

  const onTagClicked = (tagDescriptor: TagDescriptor) => {
    const tagIndex = selectedTags.findIndex(
      (t) => t.tag.uniqueId === tagDescriptor.tag.uniqueId,
    );
    const isSelected = tagIndex >= 0;

    let newSelectedTags: TagDescriptor[];
    if (isSelected) {
      // Only one tag can be selected: if I to deselect this, no more tag is selected
      newSelectedTags = [];
    } else {
      // Only one tag can be selected: if I select this, the list has one tag
      newSelectedTags = [tagDescriptor];
    }

    setSelectedTags(newSelectedTags)
  };

  return (
    <DrawerContentScrollView style={styles.container}>
      <Button onPress={onOkPress}>Ok</Button>
      <FlatList
        style={styles.list}
        data={props.tags}
        renderItem={({ item }) => (
          <TagChip
            tag={item}
            selected={isTagSelected(item)}
            onClick={onTagClicked}
            style={styles.listItem}
            selectedStyle={styles.selectedListItem}
          />
        )}
        keyExtractor={(item) => item.tag.uniqueId}
        extraData={selectedTags}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AlbuminColors.surface,
  },
  list: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  listItem: {
    marginTop: 7,
    marginBottom: 7,
  },
  selectedListItem: {
    backgroundColor: AlbuminColors.primary,
  },
});

const mapStateToProps = (state: AppState): StateProps => ({
  tags: state.tagReducer.tags || [],
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
  loadTags: loadTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsFilterScreen);
