const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL
export const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "dent_app")

    const res = await fetch(cloudinaryUrl,
        {
            method: "POST",
            body: formData,
        }
    )

    const data = await res.json()
    return data.secure_url
}