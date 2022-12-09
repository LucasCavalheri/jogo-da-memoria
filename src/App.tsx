import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import * as C from './App.styles';
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
  const [win, setWin] = useState<boolean>(false);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setElapsedTime(elapsedTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, elapsedTime]);

  // Verifica se os items abertos são iguais
  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((el) => el.show /* el.show === true */);
      if (opened.length === 2) {
        // Verificação 1: Se são iguais, torná-los permanentes
        if (opened[0].item === opened[1].item) {
          let temporaryGrid = [...gridItems];
          for (let i in temporaryGrid) {
            if (temporaryGrid[i].show) {
              temporaryGrid[i].permanentShow = true;
              temporaryGrid[i].show = false;
            }
          }
          setGridItems(temporaryGrid);
          setShowCount(0);
        } else {
          // Verificação 2: Se não são iguais, fechar eles
          setTimeout(() => {
            let temporaryGrid = [...gridItems];
            for (let i in temporaryGrid) {
              temporaryGrid[i].show = false;
            }
            setGridItems(temporaryGrid);
            setShowCount(0);
          }, 1000);
        }
        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [showCount, gridItems]);

  // Verifica se o jogo acabou
  useEffect(() => {
    if (moveCount > 0 && gridItems.every((el) => el.permanentShow)) {
      setWin(true);
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    // Passo 1: Resetar o jogo
    setWin(false);
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

  const handleItemClick = (i: number) => {
    if (playing && i !== null && showCount < 2) {
      let temporaryGrid = [...gridItems];
      if (!temporaryGrid[i].permanentShow && !temporaryGrid[i].show) {
        temporaryGrid[i].show = true;
        setShowCount(showCount + 1);
      }
      setGridItems(temporaryGrid);
    }
  };

  return (
    <>
      <Modal
        size='sm'
        show={win}
        onHide={() => setWin(false)}
        aria-labelledby='example-modal-sizes-title-sm'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-sm'>
            Parabéns! 👏
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Você venceu o jogo com: {moveCount} movimentos.</Modal.Body>
      </Modal>
      <C.Container>
        <C.Info>
          Feito por:
          <C.LogoLink href='https://www.linkedin.com/in/lucas-cavalheri/'>
            Lucas Cavalheri
          </C.LogoLink>
          <C.InfoArea>
            <InfoItem label='Tempo' value={formatElapsedTime(elapsedTime)} />
            <InfoItem label='Movimentos' value={moveCount.toString()} />
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
    </>
  );
};

export default App;
