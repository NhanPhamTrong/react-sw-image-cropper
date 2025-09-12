import "./CropOptionMenu.scss"

const BUTTON_LIST = ["Siege", "WGB", "WGB", "WGB", "WGB", "WGB", "Rune Landscape", "Rune Portrait"]

export const CropOptionMenu = ({ GetOption }) => {
    const ClickOption = (e) => {
        document.querySelectorAll(".crop-option-menu_item button").forEach(item => {
            item.classList.remove("active")
        })
        e.target.classList.add("active")

        GetOption(e)
    }

    return (
        <div id="crop-option-menu">
            <ul className="crop-option-menu_list">
                {BUTTON_LIST.map((item, index) => (
                    <li
                        className="crop-option-menu_item"
                        key={index}
                    >
                        <button
                            className={item === "Siege" ? "active" : ""}
                            type="button"
                            name={item}
                            onClick={ClickOption}
                        >
                            {item !== "WGB" ? item : item + " " + index}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}