import "./PastingForm.scss"

export const PastingForm = ({ pasteImg }) => {
    return (
        <button onClick={pasteImg} className="paste-btn">
            <span>
                <ion-icon name="clipboard-outline"></ion-icon>
            </span>
        </button>
    )
}