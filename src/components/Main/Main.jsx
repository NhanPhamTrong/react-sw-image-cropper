import "./Main.scss"
import { useState } from "react"
import { ChooseFileForm } from "../ChooseFileForm/ChooseFileForm"
import { PastingForm } from "../PastingForm/PastingForm"
import { ImageCropper } from "../ImageCropper/ImageCropper"
import { CropOptionMenu } from "../CropOptionMenu/CropOptionMenu"

const ASPECT_RATIO = 1
const MIN_DIMENSION = 320
const WGB_MATCH_DISTANCE = 9.5

const SIEGE_CROP = {
    unit: "%", // Can be 'px' or '%'
    x: 32.8,
    y: 43.4,
    width: 34.4,
    height: 7
}

const WGB_CROP = {
    unit: "%", // Can be 'px' or '%'
    x: 29.8,
    y: 34.5,
    width: 32.8,
    height: 7.2
}

const RUNE_LANDSCAPE_CROP = {
    unit: "%", // Can be 'px' or '%'
    x: 24.3,
    y: 27.7,
    width: 51.9,
    height: 44.1
}

const RUNE_PORTRAIT_CROP = {
    unit: "%", // Can be 'px' or '%'
    x: 1.2,
    y: 2.4,
    width: 30,
    height: 84.9
}

const CROP_OPTIONS = SIEGE_CROP

const CROP_STATS = {
    ASPECT_RATIO,
    MIN_DIMENSION,
    CROP_OPTIONS
}

export const Main = () => {
    const [title, setTitle] = useState("Siege")
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [imgSrc, setImgSrc] = useState("")
    const [cropStats, setCropStats] = useState(CROP_STATS)

    const onSelectFile = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || ""
            setImgSrc(imageUrl)
        });
        reader.readAsDataURL(file)
    }

    const pasteImg = async () => {
        try {
            const clipboardItems = await navigator.clipboard.read()
            const blobOutput = await clipboardItems[0].getType('image/png')
            const data = URL.createObjectURL(blobOutput)
            setImgSrc(data)
        } catch (e) {
            console.log(e)
        }
    }

    const GetOption = (e) => {
        const option = e.target.name
        let cropOption = ""

        switch (option) {
            case "Rune Landscape":
                cropOption = RUNE_LANDSCAPE_CROP
                break
            case "Rune Portrait":
                cropOption = RUNE_PORTRAIT_CROP
                break
            case "WGB":
                const innerText = e.target.innerText
                cropOption = {
                    ...WGB_CROP,
                    y: WGB_CROP.y + WGB_MATCH_DISTANCE * (innerText[innerText.length - 1] - 1)
                }
                break
            default:
                cropOption = SIEGE_CROP
        }

        setCropStats(() => ({
            ...CROP_STATS,
            CROP_OPTIONS: cropOption
        }))
        setTitle(option.split("_").join(" "))
    }

    return (
        <div id="sw-image-cropper">
            <CropOptionMenu
                GetOption={GetOption}
            />
            <h1>{title}</h1>
            <div className="image-upload-form">
                <ChooseFileForm
                    onSelectFile={onSelectFile}
                />
                <PastingForm
                    pasteImg={pasteImg}
                />
            </div>
            {imgSrc && (
                <div className="result">
                    <div className="result_crop-section">
                        <ImageCropper
                            updateAvatar={(imgSrc) => setAvatarUrl(imgSrc)}
                            imgSrc={imgSrc}
                            cropStats={cropStats}
                        />
                    </div>
                    <div className="result_final-image">
                        {avatarUrl && (
                            <img
                                src={avatarUrl}
                                alt="Avatar"
                                className="result_image"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}