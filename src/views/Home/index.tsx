"use client";

import { useState } from "react"
import Dice from "../components/Dice"
import DiceCard from "../components/DiceCard"



const Home: React.FC<React.PropsWithChildren> = () => {

    let [diceNum, setDiceNum] = useState([
        { sides: 4, num: 0, imageUrl: "/assets/images/dice-d4.png" },
        { sides: 6, num: 0, imageUrl: "/assets/images/dice-d6.png" },
        { sides: 12, num: 0, imageUrl: "/assets/images/dice-d12.png" },
        { sides: 20, num: 0, imageUrl: "/assets/images/dice-d20.png" }
    ])

    return (
        <div>

            {/* Dice List */}
            <ul className="flex flex-row">
                {
                    diceNum.map(dice => (
                        <li key={dice.sides} className="basis-1/4 hover:border-2">
                            <DiceCard imageUrl={dice.imageUrl} />
                        </li>
                    ))
                }
            </ul>
            <Dice />
        </div>
    )
}
export default Home