import { useEffect,  } from 'react';
import Phaser from 'phaser';
import image from './logo512.png'
import background from './background.jpeg'


const StartBallAnimation = ({isSessionActive})=> {
   
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
                    gravity: { y: 0 },
                    debug: false
                }
            },
        };
    
        const game = new Phaser.Game(config);
        let ball;
        
        function preload() {
            this.load.image('backGround', background)
            this.load.image('ball', image);
        }
    
        function create() {
            const bg = this.add.image(400, 300, 'backGround')
            const width1 = 800;
            const height1 = 600;
            bg.setScale(width1 / bg.width, height1 / bg.height);
      
             ball = this.physics.add.sprite(400, 300, 'ball').setScale(0.1)
                .setVelocity(0, 0)
                .setCollideWorldBounds(true, 1, 1, true); 

            if (isSessionActive) {
                ball.setVelocity(Phaser.Math.Between(-800, 800), Phaser.Math.Between(-800, 800));
              }                     
        }
        return () => {
            game.destroy(true); // Cleanup function to destroy the game instance
        };

    },[isSessionActive])
   
    return <div id="mainGame" />;
};

export default StartBallAnimation;