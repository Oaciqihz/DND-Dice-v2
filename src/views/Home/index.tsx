"use client";

import { useEffect, useState } from "react"
import Dice from "../components/Dice"
import DiceCard from "../components/DiceCard"
import DiceBonusCard from "../components/DiceBonusCard";
import { DICES } from "@/config/dice";

type dice = {
    sides: number,
    num: number,
    imageUrl: string
}

type diceBonus = {
    sides: number,
    num: number,
    imageUrl: string,
    status: string
}

const Home: React.FC<React.PropsWithChildren> = () => {

    const [selectDice, setSelectDice] = useState<number|null>(null);
    const [rollDiceStr, setRollDiceStr] = useState<string>();
    let [rollDiceList, setRollDiceList] = useState<string[]>()
    let [diceBonusIndex, setDiceBonusIndex] = useState<number>(0);
    let [diceBonusNum, setDiceBonusNum] = useState<diceBonus>({ sides: 0, num: 0, imageUrl: "", status: "" })
    let [diceNum, setDiceNum] = useState<dice[]>([]);

    function changeSelectDice(index: number) {
        setSelectDice(index);
    }

    function clearSelectDice() {
        setSelectDice(null);
    }

    // 奖励骰类型 ? 优势 : 劣势
    function changeBonusStatus(status: string) {
        diceBonusNum.status = status;
        setDiceBonusNum({...diceBonusNum});
        changeDiceString();
    }

    // 奖励骰面
    function changeDiceType(type: string) {
        switch (type) {
            case "add":
                diceBonusIndex = diceBonusIndex+1 > DICES.length - 1 ? 0 : diceBonusIndex+1;
                setDiceBonusIndex(diceBonusIndex)
                break;
            case "reduce":
                diceBonusIndex = diceBonusIndex-1 < 0 ? DICES.length - 1 : diceBonusIndex-1;
                setDiceBonusIndex(diceBonusIndex)
                break;
            default:
                break;
        }
        diceBonusNum = {
            ...diceBonusNum,
            ...DICES[diceBonusIndex],
        }
        setDiceBonusNum({...diceBonusNum});
        changeDiceString();
    }

    // 数量
    function changeDiceNum(num: number, isBonus: boolean) {
        // 优劣骰
        if (isBonus) {
            diceBonusNum.num = num;
            setDiceBonusNum({...diceBonusNum});
            changeDiceString();
            return
        }

        // 普通骰
        if (typeof selectDice === "number") {
            diceNum[selectDice].num = num;
            setDiceNum([...diceNum]);
            changeDiceString();
        }
    }

    // 总计
    function changeDiceString() {
        let arr: Array<string> = [];
        let str: string = "";
        diceNum.forEach(dice => {
            if (dice.num !== 0) {
                arr.push(`${dice.num}d${dice.sides}`)
            }
        })
        str = arr.join("+");
        // 优劣骰计算
        if (diceBonusNum.num !== 0) {
            str = str + `${diceBonusNum.status === "adv" ? "+" : diceBonusNum.status === "unadv" ? "-" : ""}${diceBonusNum.num}d${diceBonusNum.sides}`
        }
        rollDiceList = arr;
        setRollDiceList([...rollDiceList]);
        setRollDiceStr(str);
    }

    // 初始化
    function init() {
        const normalDice: Array<dice> = [];
        DICES.forEach(dice => {
            normalDice.push({
                ...dice,
                num: 0
            })
        })
        diceNum = normalDice;
        setDiceNum([...diceNum]);

        diceBonusNum = {
            ...DICES[diceBonusIndex],
            num: 0,
            status: "adv"
        }
        setDiceBonusNum({...diceBonusNum});
    }

    useEffect(() => {
        init();
    },[])

    return (
        diceNum?.length !== 0 &&
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
                    <li
                        className={`h-[300px] w-[300px] my-[30px] hover:shadow-xl`}
                    >
                        <DiceBonusCard  
                            imageUrl={diceBonusNum.imageUrl} 
                            tabIndex={diceBonusNum.sides} 
                            selectNum={diceBonusNum.num}
                            bonusStatus={diceBonusNum.status}
                            changeDiceNum={changeDiceNum}
                            clearSelectDice={clearSelectDice}
                            setBonusStatus={changeBonusStatus}
                            changeDiceType={changeDiceType}
                        />
                    </li>
            </ul>
            <Dice rollDiceList={rollDiceList} rollDiceBonusList={diceBonusNum} />
        </div>
    )
}
export default Home