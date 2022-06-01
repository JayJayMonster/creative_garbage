import * as ml5 from 'ml5';
import { useEffect, useState } from 'react';

export function Home() {
  const [classifier, setClassifier] = useState(null);
  const [loadStatus, setLoadStatus] = useState(true);
  const [selectedFile, setSelectedFile] = useState('unknown image');

  //variables accuracy
  const labelsArray = [
    'bananaPeel',
    'cardboard',
    'glass',
    'kroonkurk',
    'plasticBottleCap',
    'plasticBottle',
    'plasticBag',
  ];

  //variables recycling
  const recycleObject = {
    bananaPeel: 'Rub it on your shoes',
    cardboard: 'You can use cardboard for something',
    glass: 'There is a special bin for glass',
    kroonkurk: 'Maybe use this metal to something something',
    plasticBottleCap: 'Recycle your bottle cap',
    plasticBottle: 'Recycle your bottles',
    plasticBag: 'Horibble for the environment',
  };

  useEffect(() => {
    let featureExtractor;
    featureExtractor = ml5.featureExtractor('MobileNet', () => modelLoaded());
    const modelLoaded = () => {
      console.log('MobileNet data is Loaded!');
      featureExtractor.load('./model.json', () => {
        console.log('the garbage model is also loaded');
        setClassifier(featureExtractor);
        setLoadStatus(false);
      });
    };
  }, []);

  const classifySomething = () => {
    setSelectedFile('No longer unkown');
    classifier.classification(selectedFile, (err, results) => {
      console.log(results);
    });
  };

  // if still loading only return a message
  if (loadStatus) return <div>LOADING IMAGENET AND GARBAGE MODEL</div>;

  // When the model is loaded
  return (
    <div className="Home">
      <h1>Creative Garbage</h1>
      <h2>Trash Detector</h2>
      <img src="" id="output" />

      <div id="upload-image">
        <label>Upload your own: </label>
        <input
          type="file"
          accept="image/*;capture=camera"
          id="file"
          onChange={e => setSelectedFile(e.target.files[0])}
        />
      </div>
      <div>{selectedFile}</div>

      <button id="btn" onClick={classifySomething}>
        Classify
      </button>
      <div id="accuracy">Accuracy...</div>
      <div id="recycle">What could you do with it?</div>
    </div>
  );
}
