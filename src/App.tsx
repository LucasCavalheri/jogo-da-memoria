import { useEffect, useState } from 'react';
import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import Button from './components/Button/Button';
import GridItem from './components/GridItem/GridItem';
import InfoItem from './components/InfoItem/InfoItem';
import { items } from './data/items';
import { formatElapsedTime } from './helpers/formatElapsedTime';
import restartIcon from './svgs/restart.svg';
import { GridItemType } from './types/GridItemType';

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setElapsedTime(elapsedTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, elapsedTime]);

  const resetAndCreateGrid = () => {
    // Passo 1: Resetar o jogo
    setElapsedTime(0);
    setMoveCount(0);
    setShowCount(0);

    // Passo 2: Criar o grid
    // 2.1: Criar um grid vazio
    let temporaryGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i += 1) {
      temporaryGrid.push({
        item: null,
        show: false,
        permanentShow: false,
      });
    }

    // 2.2: Preencher o grid de forma aleatória
    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < items.length; j += 1) {
        let position = -1; // 0 já é uma posição

        while (position < 0 || temporaryGrid[position].item !== null) {
          position = Math.floor(Math.random() * (items.length * 2)); // 1 a 12
        }
        temporaryGrid[position].item = j;
      }
    }

    // 2.3: Jogar no state
    setGridItems(temporaryGrid);

    // Passo 3: Começar o jogo
    setPlaying(true);
  };

  const handleItemClick = (i: number) => {};

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={logoImage} width='200' /> {/* Componentizar a img */}
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value={formatElapsedTime(elapsedTime)} />
          <InfoItem label='Movimentos' value='0' />
        </C.InfoArea>

        <Button
          label='Reiniciar'
          icon={restartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((el, i) => (
            <GridItem key={i} item={el} onClick={() => handleItemClick(i)} />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
