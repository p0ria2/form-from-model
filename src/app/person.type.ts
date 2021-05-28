import { FormControl } from "./form-control.decorator"

export class Person {
    id: number;

    @FormControl({ type: 'text' })
    name: string

    @FormControl({ type: 'number' })
    age: number
}