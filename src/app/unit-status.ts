export class UnitStatus {
    _id: string;
    latitude: number;
    longitude: number;
    picture: {
        width: number;
        height: number;
        url: string;
    }
    acceleration: number;
    velocity: number;
    createdAt: Date;
}
