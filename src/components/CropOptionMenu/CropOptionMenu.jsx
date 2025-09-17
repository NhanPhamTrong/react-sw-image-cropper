import "./CropOptionMenu.scss"

const BUTTON_LIST = [
    ["Siege"],
    ["WGB", "WGB", "WGB", "WGB", "WGB"],
    ["Rune Landscape", "Rune Portrait"],
    ["Team Raid", "Team Raid", "Team Raid"],
    ["Team Rift Dungeon", "Team 4 5"]
]

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
            {BUTTON_LIST.map((item, itemIndex) => (
                <ul
                    className="crop-option-menu_list"
                    key={itemIndex}
                >
                    {item.map((button, buttonIndex) => (
                        <li
                            className="crop-option-menu_item"
                            key={buttonIndex}
                        >
                            <button
                                className={button === "Siege" ? "active" : ""}
                                type="button"
                                name={button}
                                onClick={ClickOption}
                            >
                                {button === "WGB" ? (
                                    button + " " + (buttonIndex + 1)
                                ) : (
                                    button === "Team Raid" ? (button + " " + (buttonIndex + 1)) : button
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    )
}