import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-black text-lg cursor-pointer">
          ✕
        </button>
        {title && <h2 className="text-2xl font-bold mb-8 pb-4 pt-4 flex flex-col items-center border-b-2 border-gray-300">{title}</h2>}
        <div className="text-sm">
            {children || <p className="text-center">Không có nội dung nào.</p>}
        </div>
      </div>
    </div>
  )
}

export default Modal
