import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';

let recognizer;
let words;

export async function loadModel() {
  if (!recognizer) {
    recognizer = speechCommands.create('BROWSER_FFT', '18w');
    await recognizer.ensureModelLoaded();
    words = recognizer.wordLabels();
    console.log('Voice model loaded. Recognized labels:', words);
  }
  return recognizer;
}

export function startListening(callback) {
  if (!recognizer) return;
  recognizer.listen(
    ({ scores }) => {
      const scoreList = Array.from(scores).map((s, i) => ({
        score: s,
        word: words[i],
      }));
      scoreList.sort((s1, s2) => s2.score - s1.score);
      const command = scoreList[0].word;
      callback(command);
    },
    {
      includeSpectrogram: true,
      probabilityThreshold: 0.9,
    }
  );
}

export function stopListening() {
  if (recognizer) {
    try {
      recognizer.stopListening();
    } catch (e) {
      // ignore if not currently listening
    }
  }
}

export default recognizer;
