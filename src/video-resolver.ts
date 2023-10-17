import { Application, Graphics, ICanvas, ParticleContainer } from "pixi.js";
import { CoordinateBoudedBox, PlayerBoxSprite, PlayerTrack } from "./player-box-sprite";

export type DataBoundedBox = {
    supertracks: { [p: number]: SuperTrack },
    tracks: TrackFlow[]
}
type TeamType = {
    [teamName: number]: {
        color: '0x00FFFF' | '0xFF00FF',
        width: number,
        heigth: number,
        type: 'player' | 'ball'
    }
}

type TrackFlow = { [frame: number]: { [trackId: number]: CoordinateBoudedBox }[] };
type SuperTrack = { name: number, team: number, tracks_data: PlayerTrack[] }

export class VideoResolver {
    private teams: TeamType = {};

    private spriteContainer = new ParticleContainer();
    private app: Application<ICanvas>
    constructor(
        public data: DataBoundedBox,
        app: Application<ICanvas>
    ) {
        this.app = app;
    }

    playerSprites: PlayerBoxSprite[] = [];

    initializeFigures = () => {
        Object.keys(this.data.supertracks).forEach((trackKey) => {
            const track = this.data.supertracks[(trackKey as unknown as keyof DataBoundedBox['supertracks'])];
            const graphics = new Graphics();
            graphics.lineStyle(2, 0x00FFFF, 1);
            graphics.beginFill(0x00FFFF, 0.25);
            graphics.drawRect(20, 20, 50, 50);
            graphics.endFill();
            const texture = this.app.renderer.generateTexture(graphics);
            const playerSprite = new PlayerBoxSprite(texture, track.tracks_data, `player-${track.name}`);
            this.playerSprites.push(playerSprite);
            this.app.stage.addChild(playerSprite);
            this.spriteContainer.addChild(playerSprite);
        })
        this.app.stage.addChild(this.spriteContainer);
    }

    get spriteContainerPlayers() {
        return this.spriteContainer;
    }

    public moveFigures = (frame: number) => {
        if (this.playerSprites.length === 0) {
            this.initializeFigures();
        }
        for (let player of this.playerSprites) {
            const trackId = player.getTrackId(frame);
            if (!trackId) {
                continue;
            }
            const coordinates = this.data.tracks[trackId]?.[frame];
            if (coordinates) {
                player.moveFromCoordinates(coordinates as any);
            }
        }
    }
}