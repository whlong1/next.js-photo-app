interface ConfirmationModalProps {
  title: string;
  message: string;
  showModal: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { title, message, showModal, onCancel, onConfirm } = props
  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="form-button-cta" onClick={onConfirm}>
          Confirm
        </button>
        <button className="form-button-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal