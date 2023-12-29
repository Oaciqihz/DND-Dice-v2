"use client";

import DiceBox from "@3d-dice/dice-box";
import DisplayResults from "@3d-dice/fui/src/displayResults";
import AdvancedRoller from "@3d-dice/fui/src/advancedRoller";
import BoxControls from "@3d-dice/fui/src/boxControls";
import { useEffect, useState } from "react";

const Dice = () => {
    let [diceBox, setDiceBox] = useState<any>();

    function roll() {
        diceBox.clear();
        diceBox.roll(["4d20"]);
    }

    useEffect(() => {
        const dom = document.getElementById("dice-box");
        if (dom) {
            diceBox = new DiceBox("#dice-box", {
                assetPath: "/assets/", // include the trailing backslash
                offscreen: true,
                scale: 12
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
                        console.log(results);
                        // Display.showResults(results);
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
            <h1>Dice</h1>
            <div id="dice-box"></div>
            <button onClick={roll}>roll</button>
        </div>
    );
};

export default Dice;
