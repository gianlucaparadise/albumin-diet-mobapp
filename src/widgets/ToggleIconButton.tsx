import React, { Component, ReactNode } from 'react';
import { IconButton, PartialIconProps } from 'react-native-paper';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AlbuminIcon from '../albumin-icons/AlbuminIcons';

//#region Types
type IconType = 'eggs' | 'save';
interface IconDescriptor {
  selected: string;
  unselected: string;
  selectedTooltip: string;
  unselectedTooltip: string;
  iconSource: typeof MaterialIcon;
}
type IconNamesMap = { [name in IconType]: IconDescriptor };
//#endregion

//#region Descriptor definition
const toggleIcons: IconNamesMap = {
  eggs: {
    selected: 'eggs_filled',
    unselected: 'eggs_outlined',
    selectedTooltip: 'Remove from Listening List',
    unselectedTooltip: 'Add to Listening List',
    iconSource: AlbuminIcon,
  },
  save: {
    selected: 'favorite',
    unselected: 'favorite-border',
    selectedTooltip: 'Remove from My Albums',
    unselectedTooltip: 'Add to My Albums',
    iconSource: MaterialIcon,
  },
};
//#endregion

interface Props {
  type: IconType;
  selected?: boolean;
  enabled?: boolean;
  onPress?: () => void;
}

interface State {
  // selected: boolean,
  // enabled: boolean,
}

export default class ToggleIconButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {}

  getIcon = (props: PartialIconProps, selected?: boolean): ReactNode => {
    const icon = toggleIcons[this.props.type];

    const IconSource = icon.iconSource;
    const name = selected === true ? icon.selected : icon.unselected;
    // const tooltip = selected ? icon.selectedTooltip : icon.unselectedTooltip; // TODO: tooltip handling

    return <IconSource name={name} color={props.color} size={props.size} />;
  };

  render() {
    return (
      <IconButton
        icon={(props) => this.getIcon(props, this.props.selected)}
        onPress={this.props.onPress}
        disabled={!this.props.enabled}
      />
    );
  }
}
