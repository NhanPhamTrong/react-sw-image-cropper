import "./ImageCropper.scss"
import { useRef } from "react"
import ReactCrop, { convertToPixelCrop } from "react-image-crop"
import setCanvasPreview from "../../setCanvasPreview"

export const ImageCropper = ({
    updateAvatar,
    imgSrc,
    cropStats
}) => {
    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null)

    return (
        <>
            {imgSrc && (
                <div className="crop-section">
                    <button
                        className="crop-section_btn"
                        onClick={() => {
                            setCanvasPreview(
                                imgRef.current, // HTMLImageElement
                                previewCanvasRef.current, // HTMLCanvasElement
                                convertToPixelCrop(
                                    cropStats.CROP_OPTIONS,
                                    imgRef.current.width,
                                    imgRef.current.height
                                )
                            )
                            const dataUrl = previewCanvasRef.current.toDataURL()
                            updateAvatar(dataUrl)
                        }}
                    >
                        Crop Image
                    </button>
                    {imgSrc && (
                        <ReactCrop
                            crop={cropStats.CROP_OPTIONS}
                            keepSelection
                            aspect={cropStats.ASPECT_RATIO}
                            minWidth={cropStats.MIN_DIMENSION}
                        >
                            <img
                                ref={imgRef}
                                src={imgSrc}
                                alt="uploaded-image"
                                style={{ maxHeight: "70vh" }}
                            />
                        </ReactCrop>
                    )}
                </div>
            )}
            {cropStats.CROP_OPTIONS && (
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </>
    )
}