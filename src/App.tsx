import styles from './App.module.css';
import poweredBy from './assets/powered.png'
import leftArrow from './assets/leftarrow.png'
import { useState } from 'react';
import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItems';

const App = () => {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [showItem, setShowItem] = useState<Level | null>(null);

  const handleCalculateButton = () => {

    // verificar si heightField y weightField tienen valores
    if ( heightField &&  weightField) {
        
      setShowItem(calculateImc(heightField,weightField)) ;
    
      console.log(showItem); 

    }  else {
      alert ('por favor revise seus dados!!!!')
    }
  }

  const handleClickRevert = () => {
    setShowItem(null);
    setHeightField(0);
    setWeightField(0);
  }


  return (

    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredBy} alt="" width={150}></img>
        </div>  
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule su IMC</h1>
          <p>IMC é a sigla de indice de Massa Corpórea, parámetro adotado pela OMS para calcular o peso ideal de cada pessoa.</p>

          <input 
            type="number" 
            placeholder='Digite a sua altura. Ex. 1.5 ( em métros)'
            value={heightField > 0? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={showItem ? true : false}
          />

          <input 
            type="number" 
            placeholder='Digite seu peso. Ex. 75 ( em kg)'
            value={weightField > 0? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={showItem ? true : false}
          />
          <button onClick={handleCalculateButton} disabled={showItem ? true : false}>Cacular</button>
        </div>
        <div className={styles.rightSide}>
            <div className={styles.leftArrow} onClick={handleClickRevert}>
                <img src={leftArrow} alt="" width={20} />
            </div>      
            {!showItem && 
                <div className={styles.grid}>
                    {levels.map((item, key)=> (
                        <GridItem key={key} item={item} />
                    ))}
                </div>
           }
          {showItem && 
                <div className={styles.rightBig}>
                    <div className={styles.rightArrow}></div>
                    <GridItem item={showItem} />
                </div>
          }
        </div>
      </div>
    </div>
  )

}

export default App