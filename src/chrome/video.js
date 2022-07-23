import { Jungle } from "./jungle";

let _audioCtx = null;
let _jungle = null;
let _previousPitch = 0;
let _volume = 0;

let transpose = false;

let videoConnected = false;

const getAudioContext = () => {
  if (!_audioCtx) {
    _audioCtx = new AudioContext();
  }
  return _audioCtx;
};

const getJungle = () => {
  if (!_jungle) {
    const audioCtx = getAudioContext();
    _jungle = new Jungle(audioCtx);
    _jungle.output.connect(audioCtx.destination);
  }
  return _jungle;
};

const outputNodeMap = new Map();

const getOutputNode = (video) => {
  let outputNode = outputNodeMap.get(video);

  if (outputNode === undefined) {
    const audioCtx = getAudioContext();
    outputNode = {
      outputNode: audioCtx.createMediaElementSource(video),
      destinationConnected: false,
      pitchShifterConnected: false,
    };
    outputNodeMap.set(video, outputNode);
  }

  return outputNode;
};

const connectAudioVolume = async (outputNode) => {
  const analyserNode = getAudioContext().createAnalyser();
  outputNode.connect(analyserNode);

  const pcmData = new Float32Array(analyserNode.fftSize);
  const onFrame = () => {
    analyserNode.getFloatTimeDomainData(pcmData);
    let sumSquares = 0.0;
    for (const amplitude of pcmData) {
      sumSquares += amplitude * amplitude;
    }

    _volume = Math.sqrt(sumSquares / pcmData.length);

    window.requestAnimationFrame(onFrame);
  };

  window.requestAnimationFrame(onFrame);
};

const connectVideo = (video) => {
  const nodeData = getOutputNode(video);

  connectAudioVolume(nodeData.outputNode);

  const outputNode = nodeData.outputNode;

  let jungle = getJungle();
  if (!nodeData.pitchShifterConnected) {
    outputNode.connect(jungle.input);
    nodeData.pitchShifterConnected = true;
  }

  if (nodeData.destinationConnected) {
    const audioCtx = getAudioContext();
    outputNode.disconnect(audioCtx.destination);
    nodeData.destinationConnected = false;
  }

  jungle.setPitchOffset(_previousPitch, transpose);
  videoConnected = true;
};

const disconnectVideo = (video) => {
  const audioCtx = getAudioContext();

  const jungle = getJungle();

  const nodeData = getOutputNode(video);

  const outputNode = nodeData.outputNode;

  if (nodeData.pitchShifterConnected) {
    outputNode.disconnect(jungle.input);
    nodeData.pitchShifterConnected = false;
  }

  if (!nodeData.destinationConnected) {
    outputNode.connect(audioCtx.destination);
    nodeData.destinationConnected = true;
  }
};

const videoListeners = new Map();

function disconnectAllVideos() {
  outputNodeMap.forEach((_nodeData, video) => {
    disconnectVideo(video);
  });

  videoListeners.forEach((listener, video) => {
    video.removeEventListener("playing", listener);
  });
  videoConnected = false;
}

let _observer = null;

/**
 * @param {HTMLVideoElement} newVideoEl
 */
const changeVideo = (newVideoEl) => {
  connectVideo(newVideoEl);
};

/**
 * @param {HTMLVideoElement} video
 */
const isVideoPlaying = (video) => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

/**
 * @param {HTMLVideoElement} listenVideoEl
 */

const listenForPlay = (listenVideoEl) => {
  const listener = videoListeners.get(listenVideoEl);
  if (listener === undefined) {
    const listenerCallback = () => {
      changeVideo(listenVideoEl);
    };
    listenVideoEl.addEventListener("playing", listenerCallback);
    videoListeners.set(listenVideoEl, listenerCallback);
  }

  if (isVideoPlaying(listenVideoEl)) {
    changeVideo(listenVideoEl);
  }
};

function initVideoObservers() {
  _observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes !== undefined && mutation.addedNodes !== null) {
        for (let i = 0; i < mutation.addedNodes.length; ++i) {
          let newVideoEl = mutation.addedNodes[i];
          // Dom has changed so try and get the video element again.
          if (!(newVideoEl instanceof HTMLVideoElement)) {
            if (newVideoEl.querySelectorAll !== undefined) {
              newVideoEl.querySelectorAll("video").forEach((v) => {
                listenForPlay(v);
              });
            }
            return;
          }
          listenForPlay(newVideoEl);
        }
      }
    });
  });

  let observerConfig = {
    childList: true,
    subtree: true,
  };

  let targetNode = document.body;
  _observer.observe(targetNode, observerConfig);

  // Try get the video element.
  let videoEls = document.querySelectorAll("video");
  videoEls.forEach((v) => {
    if (v instanceof HTMLVideoElement) {
      listenForPlay(v);
    }
  });
}

export { _volume as volume, initVideoObservers };
