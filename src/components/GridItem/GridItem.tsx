import React from 'react';
import { GridItemType } from '../../types/GridItemType';
import * as C from './GridItem.styles';
import b7Svg from '../../svgs/b7.svg';
import { items } from '../../data/items';

type Props = {
  item: GridItemType;
  onClick: () => void;
}

const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container onClick={onClick}>
      {!item.permanentShow && !item.show &&
        <C.Icon src={b7Svg} />
      }
      {(item.permanentShow || item.show) && item.item !== null &&
        <C.Icon src={items[item.item].icon} />
      }
    </C.Container>
  )
}

export default GridItem