"use client";

import { useState } from "react"
import Dice from "../components/Dice"
import DiceCard from "../components/DiceCard"



const Home: React.FC<React.PropsWithChildren> = () => {

    const [selectDice, setSelectDice] = useState<number|null>(null);
    const [rollDiceStr, setRollDiceStr] = useState<string>();
    let [rollDiceList, setRollDiceList] = useState<string[]>()
    let [diceNum, setDiceNum] = useState([
        { sides: 4, num: 0, imageUrl: "/assets/images/dice-d4.png" },
        { sides: 6, num: 0, imageUrl: "/assets/images/dice-d6.png" },
        { sides: 12, num: 0, imageUrl: "/assets/images/dice-d12.png" },
        { sides: 20, num: 0, imageUrl: "/assets/images/dice-d20.png" }
    ])

    function changeSelectDice(index: number) {
        setSelectDice(index);
    }

    function clearSelectDice() {
        setSelectDice(null);
    }

    function changeDiceNum(num: number) {
        if (typeof selectDice === "number") {
            diceNum[selectDice].num = num;
            setDiceNum([...diceNum]);
            changeDiceString();
        }
    }

    function changeDiceString() {
        let arr: Array<string> = [];
        diceNum.forEach(dice => {
            if (dice.num !== 0) {
                arr.push(`${dice.num}d${dice.sides}`)
            }
        })
        rollDiceList = arr;
        setRollDiceList([...rollDiceList]);
        setRollDiceStr(arr.join("+"));
    }

    return (
        <div>
            <div className="text-center">
                <strong className="bg-text_bg">{rollDiceStr}</strong>
            </div>
            {/* Dice List */}
            <ul className="flex flex-row justify-around">
                {
                    diceNum.map((dice, index) => (
                        <li 
                            key={dice.sides} 
                            onClick={() => changeSelectDice(index)}
                            className={`h-[300px] w-[300px] my-[30px] hover:shadow-xl ${selectDice === index ? "shadow-xl" : ""}`}
                        >
                            <DiceCard 
                                imageUrl={dice.imageUrl} 
                                tabIndex={dice.sides} 
                                selectNum={dice.num}
                                changeDiceNum={changeDiceNum}
                                clearSelectDice={clearSelectDice}
                            />
                        </li>
                    ))
                }
            </ul>
            <Dice rollDiceList={rollDiceList} />
        </div>
    )
}
export default Home