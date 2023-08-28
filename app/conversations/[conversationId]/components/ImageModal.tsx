"use client"

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
   isOpen?: boolean;
   onClose: () => void;
   src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
   isOpen,
   onClose,
   src
}) => {
   if (!src) {
      return null;
   }

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <Image
            alt="Image"
            className="object-cover"
            height="500"
            width="500"
            src={src}
         />
      </Modal>
   );
}

export default ImageModal;