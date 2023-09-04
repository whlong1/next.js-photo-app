// Types
import { PhotoFormData } from "@/types/forms"
import { InputChangeEvent } from "@/types/events"

// Constants
import { PHOTO_CATEGORIES } from "@/lib/constants"

interface NewPhotoFormProps {
  photoFormData: PhotoFormData;
  handleChange: (e: InputChangeEvent) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const NewPhotoForm = ({ photoFormData, handleSubmit, handleChange }: NewPhotoFormProps) => {

  const tagsInput = (
    <div className="form-element-container">
      <label className="form-element-label" htmlFor="year">Tags</label>
      <input
        required
        type="text"
        id="tags"
        name="tags"
        className="form-element"
      />
    </div>
  )

  return (
    <form className="form w-[50%]" onSubmit={handleSubmit}>

      <div className="form-element-container">
        <label className="form-element-label" htmlFor="location">Location</label>
        <input
          required
          type="text"
          id="location"
          name="location"
          value={photoFormData.location}
          onChange={handleChange}
          className="form-element"
        />
      </div>

      <div className="form-element-container form-gap">
        <label className="form-element-label" htmlFor="description">Description</label>
        <input
          required
          type="text"
          id="description"
          name="description"
          value={photoFormData.description}
          onChange={handleChange}
          className="form-element"
        />
      </div>

      <div className="form-element-container form-gap">
        <label className="form-element-label" htmlFor="category">Category</label>
        <select
          required
          id="category"
          name="category"
          onChange={handleChange}
          className="form-element"
        >
          <option value="">Select A Category</option>
          {PHOTO_CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="form-element-container form-gap">
        <label className="form-element-label">Privacy Settings</label>
        <select
          required
          id="isPublic"
          name="isPublic"
          className="form-element"
          onChange={handleChange}
        >
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>
      </div>

      <button className="form-button-cta" type="submit">SUBMIT</button>
    </form>
  )
}

export default NewPhotoForm