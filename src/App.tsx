import { useEffect, useState } from 'react';
import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import Button from './components/Button/Button';
import InfoItem from './components/InfoItem/InfoItem';
import { items } from './data/items';
import restartIcon from './svgs/restart.svg';
import { GridItemType } from './types/GridItemType';

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  const resetAndCreateGrid = () => {
    // passo 1: Resetar o jogo
    setElapsedTime(0);
    setMoveCount(0);
    setShowCount(0);

    // passo 2: Criar o grid
    // 2.1: Criar um grid vazio
    let temporaryGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i += 1) {
      temporaryGrid.push({
        item: null,
        show: false,
        permanentShow: false,
      });
    }
    
    // 2.2: Preencher o grid


    // 2.3: Jogar no state
    setGridItems(temporaryGrid);

    // passo 3: Começar o jogo
    setGridItems([]);
    setPlaying(true);
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={logoImage} width='200' /> {/* Componentizar a img */}
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00' />
          <InfoItem label='Movimentos' value='0' />
        </C.InfoArea>

        <Button
          label='Reiniciar'
          icon={restartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid></C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
