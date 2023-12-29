import Image from "next/image"


export default function DiceCard({imageUrl}:{imageUrl: string}) {




    return (
        // Dice Card
        <div className="flex flex-col items-center">
            {/* <div className="size-40"></div> */}
            <Image
                src={imageUrl}
                alt="dice"
                width={100}
                height={100}
                priority
            />
            <div className="btns">
                <button>-</button>
                <button>+</button>
            </div>
        </div>
    )
    
}