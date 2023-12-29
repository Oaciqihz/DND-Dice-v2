import Image from "next/image";
import { useState } from "react";

export default function DiceCard({
    imageUrl,
    tabIndex,
}: {
    imageUrl: string;
    tabIndex: number;
}) {
    const [showButton, setShowButton] = useState(false);

    const handleBoxClick = () => {
        setShowButton(true);
    };

    const handleBoxBlur = () => {
        setShowButton(false);
    };

    return (
        // Dice Card
        <div
            className="flex flex-col items-center"
            onClick={handleBoxClick}
            onBlur={handleBoxBlur}
            tabIndex={tabIndex}
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
                    <button className="bg-btn hover:bg-btn_hover">-</button>
                    <button>+</button>
                </div>
            )}
        </div>
    );
}
