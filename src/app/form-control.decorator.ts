import 'reflect-metadata';

export type ControlType = 'text' | 'number'

export interface ControlProp {
    type: ControlType
}

export const FORM_CONTROL_META_KEY = 'FORM_CONTROL';
export const FORM_CONTROL_DECORATED_PROPS_KEY = 'FORM_CONTROL_DECORATED_PROPS';
export const FormControl = (prop: ControlProp): any => (target: object, propertyKey: string) => {
    registerDecoratedProperty(target, propertyKey);
    return Reflect.defineMetadata(FORM_CONTROL_META_KEY, prop, target, propertyKey);
}

const registerDecoratedProperty = (target: object, propertyKey: string) => {
    let properties: string[] = Reflect.getMetadata(FORM_CONTROL_DECORATED_PROPS_KEY, target);
    if (properties) {
        properties.push(propertyKey);
    } else {
        properties = [propertyKey];
        Reflect.defineMetadata(FORM_CONTROL_DECORATED_PROPS_KEY, properties, target);
    }
}

export const getDecoratedProperties = (target: any): string[] => {
    const properties: string[] = Reflect.getMetadata(FORM_CONTROL_DECORATED_PROPS_KEY, target) ||
        Reflect.getMetadata(FORM_CONTROL_DECORATED_PROPS_KEY, target?.prototype);
    return properties;
}

export const getControlProps = (target: any, propertyKey: string): ControlProp => {
    return Reflect.getMetadata(FORM_CONTROL_META_KEY, target, propertyKey) ||
        Reflect.getMetadata(FORM_CONTROL_META_KEY, target?.prototype, propertyKey)
}