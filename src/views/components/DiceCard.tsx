import Image from "next/image";
import { useRef, useState } from "react";

export default function DiceCard({
    imageUrl,
    tabIndex,
    selectNum,
    changeDiceNum,
    clearSelectDice
}: {
    imageUrl: string;
    tabIndex: number;
    selectNum: number
    changeDiceNum: Function;
    clearSelectDice: Function;
}) {

    const boxRef = useRef<HTMLDivElement>(null);
    const [showButton, setShowButton] = useState(false);

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
        changeDiceNum(selectNum - 1);
    }

    function addNum() {
        changeDiceNum(selectNum + 1);
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
            <Image
                src={imageUrl}
                className="cursor-pointer"
                alt="dice"
                width={100}
                height={100}
                priority
            />
            {/* Dice btns */}
            {showButton && (
                <div className="flex flex-row gap-20">
                    {/* <button className="bg-btn hover:bg-btn_hover">-</button> */}
                    <button onClick={reduceNum} disabled={selectNum === 0}>
                        <Image
                            src="/assets/svg/outside-reduce.svg"
                            alt="reduce"
                            width={30}
                            height={30}
                        />
                    </button>
                    <strong>{selectNum}</strong>
                    <button onClick={addNum}>
                        <Image
                            src="/assets/svg/outside-add.svg"
                            alt="add"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>
            )}
        </div>
    );
}
