import Image from "next/image";
import { useRef, useState } from "react";

export default function DiceBonusCard({
    imageUrl,
    tabIndex,
    selectNum,
    bonusStatus,
    changeDiceNum,
    clearSelectDice,
    setBonusStatus,
    changeDiceType
}: {
    imageUrl: string;
    tabIndex: number;
    selectNum: number,
    bonusStatus: string;
    changeDiceNum: Function;
    clearSelectDice: Function;
    setBonusStatus: Function;
    changeDiceType: Function
}) {

    const boxRef = useRef<HTMLDivElement>(null);
    const [showButton, setShowButton] = useState(false);
    // const [bonusStatus, setBonusStatus] = useState("adv");

    const handleBoxClick = () => {
        setShowButton(true);
    };
    
    function handleBoxBlur(event: React.FocusEvent<HTMLDivElement>) {
        
        if (event.relatedTarget === boxRef.current || (boxRef.current && boxRef.current.contains(event.relatedTarget as Node))) {
            return;
        }
        clearSelectDice();
        setShowButton(false);
    }

    function reduceNum() {
        changeDiceNum(selectNum - 1, true);
    }

    function addNum() {
        changeDiceNum(selectNum + 1, true);
    }

    function changeBonus(status: string) {
        setBonusStatus(status);
    }

    return (
        // Dice Card
        <div
            className="flex flex-col items-center justify-between h-full py-[30px]"
            onClick={handleBoxClick}
            onBlur={handleBoxBlur}
            tabIndex={tabIndex}
            ref={boxRef}
        >
            {/* <div className="size-40"></div> */}
            <div className="flex flex-row w-full justify-between">
                <button onClick={() => changeDiceType("reduce")}>&lt;</button>
                <Image
                    src={imageUrl}
                    className={`${bonusStatus === "adv" ? "bg-advantage" : bonusStatus === "unadv" ? "bg-disadvantage" : ""} cursor-pointer`}
                    alt="dice"
                    width={100}
                    height={100}
                    priority
                />
                <button onClick={() => changeDiceType("add")}>&gt;</button>
            </div>

            {/* Dice btns */}
            {/* {showButton && ( */}
                <div className="w-full flex flex-row justify-around">
                    {/* 优势 || 劣势 */}
                    <div className="w-2/5 flex flex-row justify-between">
                        <div 
                            className="w-[30px] h-[30px] cursor-pointer bg-advantage" 
                            onClick={() => changeBonus("adv")}></div>
                        <div 
                            className="w-[30px] h-[30px] cursor-pointer bg-disadvantage" 
                            onClick={() => changeBonus("unadv")}></div>
                    </div>

                    {/* 数量 */}
                    <div className="w-2/5 flex flex-row justify-between content-center">
                        <button onClick={reduceNum} disabled={selectNum === 0}>
                            <Image
                                src="/assets/svg/outside-reduce.svg"
                                alt="reduce"
                                width={30}
                                height={30}
                            />
                        </button>
                        <strong className="leading-[30px]">{selectNum}</strong>
                        <button onClick={addNum}>
                            <Image
                                src="/assets/svg/outside-add.svg"
                                alt="add"
                                width={30}
                                height={30}
                            />
                        </button>
                    </div>
                </div>
            {/* )} */}
        </div>
    );
}
