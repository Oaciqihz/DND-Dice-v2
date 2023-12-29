import Dice from "../components/Dice"



const Home: React.FC<React.PropsWithChildren> = () => {

    return (
        <div>
            <ul className="dice-list">
                
            </ul>
            <Dice />
        </div>
    )
}
export default Home