import './style.css'
import dataJson from './../data/data.json';
import * as PIXI from 'pixi.js';
import { VideoResolver } from './video-resolver';
import { PlayerBoxSprite } from './player-box-sprite';

const FRAME_RATE = 25;

initApp();

function initApp() {

  const data = JSON.parse(JSON.stringify(dataJson));
  console.log(data);
  

  let videoResource = new PIXI.VideoResource('./../data/game.mp4', { autoPlay: false, updateFPS: 0, muted: true });
  let videoTexture = PIXI.Texture.from(videoResource as unknown as PIXI.TextureSource);
  const videoSprite = new PIXI.Sprite(videoTexture);

  console.log(videoTexture.baseTexture.resource);
  const app = new PIXI.Application({ width: 3840, height: 800, backgroundAlpha:0 });
  app.view.style!.width = '100vw';
  app.view.style!.height = '75vh';
  document.body.appendChild(app.view as any);

  app.stage.addChild(videoSprite);
  app.ticker.maxFPS = FRAME_RATE;

  const appResolver = new VideoResolver(data, app);

  const playButton = document.createElement('button');
  playButton.className = 'play-btn';
  playButton.textContent = videoResource.source.paused ? 'Start' : 'Stop';
  playButton.addEventListener('click', function () {
    if (videoResource.source.paused) {
      playButton.textContent = 'Stop';
      videoResource.source.play();
      app.ticker.start();
    }
    else {
      playButton.textContent = 'Start';
      videoResource.source.pause();
      app.ticker.stop();
    }
  });

  document.body.appendChild(playButton);
  app.ticker.autoStart = false;
  app.ticker.speed  = 0.4;
  app.ticker.stop();

  app.ticker.add(() => {
    let currentNumberFrame = Math.floor(videoResource.source.currentTime * FRAME_RATE);
    appResolver.moveFigures(currentNumberFrame);
  
    if (videoResource.source.currentTime == videoResource.source.duration) {
      app.ticker.stop();
    }


  });
}