import { uuid } from 'uuidv4'
import { PlayerVR } from '../interface/Player';

export const random = () => Math.floor(Math.random() * 16777215).toString(16);

export const newPlayer = ():PlayerVR=> {
    return {
        id: uuid(),
        color: "#" + random(),
        head: {
            type: "headset",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        leftController: {
            type: "controller",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        rightController: {
            type: "controller",
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    };
};