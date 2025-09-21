import "react-image-crop/dist/ReactCrop.css"
import { Main } from "./components/Main/Main"
import immunityIcon from "./assets/images/Immunity.png"

export const App = () => {
    return (
        <>
            <main>
                <Main />
                <img src={immunityIcon} alt="immunity" />
            </main>
        </>
    )
}