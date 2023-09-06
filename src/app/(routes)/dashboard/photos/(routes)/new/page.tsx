"use client"

// Hooks
import { useState } from "react"
import { useRouter } from "next/navigation"

// Components
import NewPhotoForm from "../../components/UploadModal/NewPhotoForm"
import PhotoUploader from "../../components/UploadModal/PhotoUploader"

// Types
import { InputChangeEvent } from "@/types/events"
import { PhotoFormData, FileUploadData } from "@/types/forms"

// Services
import { createAndUploadPhoto } from "@/services/photoService"

const initialPhotoFormData: PhotoFormData = {
	category: "",
	location: "",
	description: "",
	isPublic: true,
}

const initialFileUploadData: FileUploadData = {
	width: 0,
	height: 0,
	file: null,
	fileName: "",
	mimeType: "",
	fileSize: 0,
}

const NewPhotoPage = () => {
	const router = useRouter()
	const [msg, setMsg] = useState("")
	const [previewURL, setPreviewURL] = useState("")
	const [photoFormData, setPhotoFormData] = useState(initialPhotoFormData)
	const [fileUploadData, setFileUploadData] = useState(initialFileUploadData)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!fileUploadData.file) {
			setMsg("Please select a file to upload!")
			return
		}
		const res = await createAndUploadPhoto(fileUploadData, photoFormData)
		handleFormReset()
		handleUploadReset()
		router.refresh()
	}

	const selectAndPreview = (file: File) => {
		const image = new Image()
		const objectUrl = URL.createObjectURL(file)
		image.src = objectUrl
		image.onload = () => setFileUploadData((current) => {
			return { ...current, width: image.height, height: image.height }
		})
		setFileUploadData((current) => {
			return {
				...current,
				file: file,
				fileName: file.name,
				mimeType: file.type,
				fileSize: file.size,
			}
		})
		setPreviewURL(objectUrl)
	}

	const handleFormReset = () => {
		setPhotoFormData(initialPhotoFormData)
	}

	const handleUploadReset = () => {
		setPreviewURL("")
		URL.revokeObjectURL(previewURL)
		setFileUploadData(initialFileUploadData)
	}

	const handleChange = ({ target }: InputChangeEvent) => {
		const { name, value, type } = target
		setPhotoFormData({
			...photoFormData, [name]: type === "number" ? parseInt(value) : value
		})
	}

	return (
		<>
			<header className="header">
				<h1>New Photo</h1>
			</header>
			<section className="flex h-full">
				<PhotoUploader
					previewURL={previewURL}
					file={fileUploadData.file}
					selectAndPreview={selectAndPreview}
					handleUploadReset={handleUploadReset}
				/>
				<NewPhotoForm
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					photoFormData={photoFormData}
				/>
			</section>
		</>
	)
}

export default NewPhotoPage