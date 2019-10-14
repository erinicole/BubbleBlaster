import React from 'react';
import Game from './game';
import key from 'keymaster';
import Blaster from './blaster';
import {randomPos} from './util'

class GameView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.bindKeyHandlers = this.bindKeyHandlers.bind(this)
    };



    componentDidMount(){
        const canvas = document.getElementById("game-canvas")
        const ctx = canvas.getContext("2d")
        this.setState({
            ctx: ctx,
            blaster: [new Blaster({ ctx: ctx })]
        }, () => {
            this.setState({game: new Game(ctx, this.state.blaster)})
        })
    }

    bindKeyHandlers() {
        // this.blaster = new Blaster({ctx: this.state.ctx})
        const moves = {
            w: [0, -1],
            a: [-1, 0],
            s: [0, 1],
            d: [1, 0],
        };
        const nBlaster = this.state.blaster
        Object.keys(moves).forEach(function (k) {
            const move = moves[k];
            key(k, () => {
                nBlaster.power(move); });
            
        });
        // key("space", function () { ship.fireBullet(); });
    };

    start(){
        this.bindKeyHandlers();
        // setInterval(
        //     ()=>{
        if(this.state.game){
            this.state.game.step();
            this.state.game.draw(this.props.bubblePosition, this.props.blasterPosition)
        }
            // }, 20)
    }


    render(){
        if(this.state.ctx){
            this.start()
        }
        const width = 800;
        const height = 600;
        return(
            <div>
                <canvas id="game-canvas" width={width} height={height}>

                </canvas>
            </div>
        )
    }
    
}

export default GameView;