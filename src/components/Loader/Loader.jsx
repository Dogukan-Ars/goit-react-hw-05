import { Oval } from "react-loader-spinner"
import style from "./Loader.module.css"

const Loader = () => {
    return (
        <div className={style.wrapper}>
            <Oval
                height={60}
                width={60}
                color="#4fa94d"
                secondaryColor="#4fa94d"
                strokeWidth={4}
                strokeWidthSecondary={4}
                visible
                className={style.spinner}
            />
            <p className={style.text}>Loading...</p>
        </div>
    )
}

export default Loader