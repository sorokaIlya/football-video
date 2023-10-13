import { PixiTouch, Sprite, Texture } from "pixi.js";


type CoordinateBoudedBox = {
    x1:number,
    x2:number,
    y1:number,
    y2:number,
}

type PlayerTrack= {
    [p:number]: {track_id: number, frame_end: number, frame_start: number}
}

export class PlayerBoxSprite extends Sprite {

    private moveFromCoordinates = (coordinateBox:CoordinateBoudedBox) =>{
        const {x1,x2,y1,y2} = coordinateBox;
        this.x = ( x1 + x2 ) / 2;
        this.y = ( y1 + y2 ) / 2;
        this.width = x2 - x1;
        this.height = y2 - y1;
    }
    
    public team?: string

    tracks:PlayerTrack[] = [];

    constructor(texture: Texture ){
        super(texture);
        
    }
    
    public proceedFrame = (videFrameNumber:number) =>{
        
    }
}
