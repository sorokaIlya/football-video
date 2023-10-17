import { PixiTouch, Sprite, Texture } from "pixi.js";


export type CoordinateBoudedBox = [
    x1:number,
    x2:number,
    y1:number,
    y2:number,
]

export type PlayerTrack = {track_id: number, frame_end: number, frame_start: number}


export class PlayerBoxSprite extends Sprite {

    public moveFromCoordinates = (coordinateBox:CoordinateBoudedBox) => {
        const [x1,y1,x2,y2] = coordinateBox;
        this.x = (( x1 + x2 ) / 2) - 20;
        this.y = (( y1 + y2 ) / 2) - 40;
        this.width = x2 - x1;
        this.height = (y2 - y1) + 20;

    }

    constructor(texture: Texture, private tracks:PlayerTrack[], public teamName:string){
        super(texture);
    }
    
    public getTrackId = (videFrameNumber:number) => {        
        for(let itemTrack of this.tracks){
            if(videFrameNumber <= itemTrack.frame_end && videFrameNumber >= itemTrack.frame_start) {  
                return itemTrack.track_id;
            }
        } 
    }   

}
