import './style.css'
import dataJson from './../data/data.json';
import * as PIXI from 'pixi.js';
import { PlayerBoxSprite } from './player-box-sprite';

const FRAME_RATE = 25;

initApp();

// type DataSource = {
//   supertracks:any[],
//   fps:number,
//   tracks:any[]
// }

function initApp() {

  const data = JSON.parse(JSON.stringify(dataJson));
  console.log(data);

  let videoResource = new PIXI.VideoResource('./../data/game.mp4', { autoPlay: false, updateFPS: 25, muted: true });
  let videoTexture = PIXI.Texture.from(videoResource as unknown as PIXI.TextureSource);
  const videoSprite = new PIXI.Sprite(videoTexture);

  console.log(videoTexture.baseTexture.resource);
  const app = new PIXI.Application({ width: 3840, height: 800 });
  app.view.style!.width = '100vw';
  app.view.style!.height = '75vh';
  document.body.appendChild(app.view as any);

  app.stage.addChild(videoSprite);
  app.ticker.maxFPS = FRAME_RATE;
  app.ticker.autoStart = false;

  const playButton = document.createElement('button');
  playButton.className = 'play-btn';
  playButton.textContent = !videoResource.source.paused ? 'Start' : 'Stop';
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

  const createPlayerSprite = createSpriteFromGraphics(app);

  const player1 = createPlayerSprite();
  app.stage.addChild(player1);

  app.ticker.autoStart = false;
  app.ticker.add((delta) => {
    let currentNumberFrame = Math.floor(videoResource.source.currentTime * FRAME_RATE);
    if (videoResource.source.currentTime == videoResource.source.duration) {
      app.ticker.stop();
    }
  });

}

function mapPlayerTracks(frame: number) {
  // const playerSprite = new PlayerBox()
}

function createSpriteFromGraphics(app: PIXI.Application<PIXI.ICanvas>) {
  const graphics = new PIXI.Graphics();
  return () => {
    graphics.lineStyle(3, 0x00FFFF, 1);
    graphics.beginFill(0x00FFFF, 0.25);
    graphics.drawRect(0, 0, 50, 50);
    graphics.endFill();
    const texture = app.renderer.generateTexture(graphics);
    return new PlayerBoxSprite(texture, '1');
  }
}