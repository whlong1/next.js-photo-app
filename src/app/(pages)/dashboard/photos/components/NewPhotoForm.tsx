// Types
import { PhotoFormData } from "@/types/forms"

interface NewPhotoFormProps {
  formData: PhotoFormData;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewPhotoForm = ({ formData, handleSubmit, handleChange }: NewPhotoFormProps) => {
  const inputClassNames = "border border-slate-200 text-slate-300 p-1 text-xs"
  const labelClassNames = "text-slate-300 font-medium text-xs mb-1"

  return (
    <form className="w-[50%] h-full flex flex-col justify-between p-4" onSubmit={handleSubmit}>
      <div>
        <label className={labelClassNames} htmlFor="title">TITLE</label>
        <input
          required
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <div>
        <label className={labelClassNames} htmlFor="category">CATEGORY</label>
        <input
          required
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <div>
        <label className={labelClassNames} htmlFor="location">LOCATION</label>
        <input
          required
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <div>
        <label className={labelClassNames} htmlFor="description">DESCRIPTION</label>
        <input
          required
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <div>
        <label className={labelClassNames} htmlFor="year">YEAR</label>
        <input
          required
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <button className="form-button-cta" type="submit">SUBMIT</button>
    </form>
  )
}

export default NewPhotoForm