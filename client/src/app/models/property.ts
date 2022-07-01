import { Rent } from "./rent";

export interface Property {
    _id: number;
    userid: number;
    address: string;
    lat: number;
    long: number;
    monthly_rent: number;
    monthly_cost: number;
    num_bed: number;
    num_bath: number;
    image: string;
    owned_since: string;
    purchase_price: number;
    rentPayments: Array<Rent>
}