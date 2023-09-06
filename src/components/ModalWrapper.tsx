const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full bg-black bg-opacity-50 absolute inset-0 z-50 flex justify-center p-4">
      {children}
    </div>
  )
}

export default ModalWrapper