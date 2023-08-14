"use client"

// React
import { useState } from "react"

// Types
import { PhotoFormData } from "@/types/forms"

const NewPhotoForm = () => {
  const initialState: PhotoFormData = {
    title: "",
    category: "",
    location: "",
    description: "",
    isUploaded: false,
    year: new Date().getFullYear(),
  }

  const [formData, setFormData] = useState(initialState)

  return (
    <form action="">

    </form>
  )
}

export default NewPhotoForm