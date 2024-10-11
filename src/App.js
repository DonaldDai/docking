import './App.css';
import { useEffect, useRef } from 'react';
import * as $3Dmol from '3dmol/build/3Dmol.js';
import receptorPdb from './receptor.pdbqt'
import targetPdb from './target.pdbqt'
import target2Sdf from './target2.sdf'

let flag = false
function App() {
  const dom = useRef(null)
  useEffect(() => {
    if (flag) {
      return;
    }
    flag = true;
    const config = { backgroundColor: 'orange' };
    const v = $3Dmol.createViewer( dom.current, config );
    Promise.all([fetch(receptorPdb).then((res) => res.text()), fetch(targetPdb).then((res) => res.text()), fetch(target2Sdf).then((res) => res.text())])
    .then(([receptor, target, target2]) => {
      // console.log('target2', target2);
      // console.log('fetch receptor', res);
      v.addModel( receptor, "pdb" );                       /* load data */
      v.addModel( target, "pdb" );                       /* load data */
      // v.addModel( target2, "sdf" );                       /* load data */
      v.setStyle({ model: 0 }, {cartoon: {color: 'spectrum'}});  /* style all atoms */
      v.setStyle({ model: 1 }, {stick: {}});  /* style all atoms */
      v.zoomTo();                                      /* set camera */
      v.render();                                      /* render scene */
      // v.zoom(1.2, 1000);                               /* slight zoom */
    });
    // console.log('receptor', typeof(receptor), receptor)
  }, []);

  return (
    <div className="App">
      <div id="container-01" className="mol-container" ref={dom}></div>
    </div>
  );
}

export default App;
