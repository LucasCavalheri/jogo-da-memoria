import { items } from '../../data/items';
import b7Svg from '../../svgs/b7.svg';
import { GridItemType } from '../../types/GridItemType';
import * as C from './GridItem.styles';

type Props = {
  item: GridItemType;
  onClick: () => void;
};

const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container
      showBackground={item.permanentShow || item.show}
      onClick={onClick}
    >
      {!item.permanentShow && !item.show && <C.Icon src={b7Svg} opacity={.1} />}
      {(item.permanentShow || item.show) && item.item !== null && (
        <C.Icon src={items[item.item].icon} />
      )}
    </C.Container>
  );
};

export default GridItem;
