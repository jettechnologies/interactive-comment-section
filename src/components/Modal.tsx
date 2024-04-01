
interface ModalProps{
    open: boolean;
    onClose: React.Dispatch<React.SetStateAction<{
        id: string;
        status: boolean;
    }>>
    children: React.ReactNode;
}

const Modal:React.FC<ModalProps> = ({
    open, 
    onClose,
    children
}) => {
  return (
    // backdrop
    <div
      onClick={() => onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        {/* <button
          onClick={() => onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 text-size-400 uppercase font-rubik font-medium"
        >
          No, cancel
        </button> */}
        {children}
      </div>
    </div>
  )
}

export default Modal