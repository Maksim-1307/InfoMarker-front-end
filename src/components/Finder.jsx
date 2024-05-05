import "./Finder.scss"
import arrow from "../img/icons/top.svg"

function Finder () {
    return (
        <div className="finder" style={{ "background-color": "#FCFF56"}}>
            <div className="finder__text">Иванов Иван Иванович</div>
            <div className="finder__bottom">
                <img className="finder__back" src={arrow} alt="" />
                <div className="finder__number">1/8</div>
                <img className="finder__next" src={arrow} alt="" />
            </div>
        </div>
    );
}

export default Finder;