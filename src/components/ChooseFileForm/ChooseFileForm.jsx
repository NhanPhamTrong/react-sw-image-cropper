import "./ChooseFileForm.scss"

export const ChooseFileForm = ({ onSelectFile }) => {
    return (
        <>
            <div className="choose-file-section">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                />
            </div>
        </>
    )
}