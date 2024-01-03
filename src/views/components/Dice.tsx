"use client";

import DiceBox from "@3d-dice/dice-box";
import DisplayResults from "@3d-dice/fui/src/displayResults";
import AdvancedRoller from "@3d-dice/fui/src/advancedRoller";
// import BoxControls from "@3d-dice/fui/src/boxControls";
import { useEffect, useState } from "react";
import "./styles.css";

type diceBonus = {
    sides: number,
    num: number,
    imageUrl: string,
    status: string
}

type total = {
    adv: string,
    unadv: string
}

const Dice = ({
    rollDiceList,
    rollDiceBonusList
}: {
    rollDiceList: Array<string> | undefined;
    rollDiceBonusList: diceBonus
}) => {
    let [diceBox, setDiceBox] = useState<any>();
    let [totalPoints, setTotalPoints] = useState<total|null>();

    function addDice() {
        diceBox.add([`${rollDiceBonusList.num}d${rollDiceBonusList.sides}`], {newStartPoint: true, themeColor: rollDiceBonusList.status === "adv" ? "#2e8555" : "#DC143C"})
    }

    function roll() {
        totalPoints = null;
        setTotalPoints(totalPoints);
        diceBox.clear();
        if (rollDiceBonusList.num !== 0) {
            addDice()
        }
        diceBox.roll(rollDiceList)
        .then((res: any) => {
            // console.log(res);
        })
    }

    function reroll() {
        /**
         *  如有remove: true ? 移除当前指定骰子重新投 : 加一个骰子
         *  diceBox.reroll({groupId: 1, rollId: 1, sides: 'd20'},{remove: true})
         */
        // diceBox.reroll({groupId: 0, rollId: 0, sides: 'd20'})
        // .then((res: any) => {
        //     console.log(res);
        // })
        // .catch((err: any) => {
        //     console.log(err);
            
        // })
    }

    useEffect(() => {
        const dom = document.getElementById("dice-box");
        if (dom) {
            diceBox = new DiceBox("#dice-box", {
                assetPath: "/assets/", // include the trailing backslash
                offscreen: true,
                // scale: 10,
                themeColor: "#2e8555",
                spinForce: 10
            });
            setDiceBox(diceBox);
            diceBox.init().then(() => {
                // 控制面板
                // new BoxControls({
                //     onUpdate: (updates: any) => {
                //         diceBox.updateConfig(updates);
                //     },
                // });
                // create display overlay
                // 通知弹窗显示覆盖
                const Display = new DisplayResults("#dice-box");

                // // create Roller Input
                const Roller = new AdvancedRoller({
                    target: "#dice-box",
                    onSubmit: (notation: any) => diceBox.roll(notation),
                    onClear: () => {
                        diceBox.clear();
                        Display.clear();
                    },
                    onReroll: (rolls: any) => {
                        // loop through parsed roll notations and send them to the diceBox
                        rolls.forEach((roll: any) =>
                            diceBox.add(roll, roll.groupId)
                        );
                    },
                    onResults: (results: any) => {
                        // Display.showResults(results);
                        let str = "";
                        let bonusStr = "";
                        results.forEach((dices: any) => {
                            const {rolls} = dices;
                            // 过滤是否是劣势骰
                            rolls.forEach((dice: any) => {
                                // 劣势
                                if (dice.themeColor === "#DC143C") {
                                    bonusStr = `-${dice.value}`;
                                }else{
                                    str = str + `+${dice.value}`;
                                }
                            });
                        });
                        // TODO: show 总计
                        str = str.slice(1);
                        totalPoints = {
                            adv: str,
                            unadv: bonusStr
                        };
                        setTotalPoints({...totalPoints});
                    },
                });
    
                // pass dice rolls to Advanced Roller to handle
                diceBox.onRollComplete = (results: any) => {
                    Roller.handleResults(results);
                };
            });
        }
    }, []);

    return (
        <div>
            <div id="dice-box">
                {/* 得分 */}
                {
                    totalPoints &&
                    <div className="displayResults">
                        <div className="results showEffect" style={{transition: "all 500ms ease 0s"}}>
                            <span className="text-advantage">{totalPoints.adv}</span>
                            <span className="text-disadvantage">{totalPoints.unadv}</span>
                            ={eval(totalPoints.adv + totalPoints.unadv)}
                        </div>
                    </div>
                }
                <button 
                    onClick={roll}
                    disabled={!rollDiceList || rollDiceList.length === 0}
                    className="absolute w-[100px] h-[30px] text-center top-1/2 rounded-full bg-btn" 
                    // style={{left: "calc((100% - 100px) / 2)"}}
                >
                    roll -&gt;
                </button>
            </div>
        </div>
    );
};

export default Dice;
