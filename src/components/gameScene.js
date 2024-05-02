import { useEffect,  } from 'react';
import Phaser from 'phaser';
import image from './logo512.png'
import background from './background.jpeg'


const StartBallAnimation = ()=> {

    useEffect(()=> {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'mainGame',
            scene: {
                preload: preload,
                create: create,        
            },
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
        };
    
        const game = new Phaser.Game(config);
        
        function preload() {
            this.load.image('backGround', background)
            this.load.image('ball', image);
        }
    
        function create() {
            const bg = this.add.image(400, 300, 'backGround')
            const width1 = 800;
            const height1 = 600;
            bg.setScale(width1 / bg.width, height1 / bg.height);
    
            const ball = this.physics.add.sprite(400, 300, 'ball').setScale(0.2)
                .setVelocity(700, -500)
                .setCollideWorldBounds(true, 1, 1, true);
    
            ball.body.acceleration.x = 500; // increase acceleration in x direction
            ball.body.acceleration.y = 500; // increase acceleration in y direction
    
            this.physics.world.on('worldbounds', (body, up, down, left, right) => {
                const { gameObject } = body;
                if (up) { gameObject.setAngle(90); }
                else if (down) { gameObject.setAngle(-90); }
                else if (left) { gameObject.setAngle(0); }
                else if (right) { gameObject.setAngle(180); }
            });                  
        }
        return () => {
            game.destroy(true); // Cleanup function to destroy the game instance
        };

    },[])
   
    return <div id="mainGame" />;
};

export default StartBallAnimation;