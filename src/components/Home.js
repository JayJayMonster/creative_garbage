import * as ml5 from 'ml5';
import { useEffect, useState } from 'react';
import { useNavigate, Route } from 'react-router-dom';
import logoUpload from '../assets/uploadgarbage.png';

export function Home() {
  const [classifier, setClassifier] = useState(null);
  const [loadStatus, setLoadStatus] = useState(true);
  const [selectedFile, setSelectedFile] = useState([]);
  const [myResult, setMyResult] = useState('Unknown image');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

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
        const classifier = featureExtractor.classification();
        setClassifier(classifier);
        setLoadStatus(false);
      });
    };
  }, []);

  const loadImage = () => {
    console.log('loading image to classify');
    // get pixel data from an image url
    let myImage = new Image();
    myImage.crossOrigin = 'anonymous';
    myImage.src = selectedFile;
    myImage.onload = event => {
      classifySomething(myImage); // of event.target
    };
  };

  if (redirect) {
    console.log('directing to detail page');
    navigate('/detail', { label: 'Banaan yo' });
  }

  const testFunction = () => {
    navigate('detail', { state: { id: 7, label: 'banaan' } });
  };

  const classifySomething = someImage => {
    classifier.classify(someImage, (err, result) => {
      if (err) console.log(err);
      console.log(result);
      //Update result to image prediction
      setMyResult(
        'Label: ' +
          labelsArray[result[0].label] +
          '\n Confidence:' +
          result[0].confidence
      );
      //Update advice to image prediction
      setMyAdvice(recycleObject[labelsArray[result[0].label]]);
      setRedirect(true);
    });
  };

  const onFileChange = e => {
    const [file] = e.target.files;
    setSelectedFile(URL.createObjectURL(file));
  };

  // if still loading only return a message
  if (loadStatus)
    return (
      <div>
        <h3>Loading model...</h3>
      </div>
    );

  // When the model is loaded
  return (
    <div className="Home">
      <button onClick={testFunction}>TEST</button>
      <h1>Creative Garbage</h1>
      <img src="" id="output" />

      <div id="upload-image">
        <label>Upload your own: </label>
        <img src={logoUpload}></img>
        <input
          type="file"
          accept="image/*;capture=camera"
          id="file"
          onChange={onFileChange}
        />
        <img src={selectedFile} alt="image" width="50%" height="50%" />
      </div>

      <button id="btn" onClick={loadImage}>
        Classify
      </button>
      {/* <div id="accuracy">{myResult}</div>
      <div id="recycle">What could you do with it?</div>
      <div id="recycleAdvice">{myAdvice}</div> */}
    </div>
  );
}
