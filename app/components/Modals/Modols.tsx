'use client'

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../container/Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

const Modols: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    const [isButtonDisabled, setIsButtonDisabled] = useState(disabled);

    useEffect(() => {
        setShowModal(isOpen);
        setIsButtonDisabled(disabled);
    }, [isOpen, disabled]);

    const handleClose = useCallback(() => {
        if (isButtonDisabled) {
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [isButtonDisabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (isButtonDisabled) {
            return;
        }
        setIsButtonDisabled(true);
        onSubmit();
    }, [isButtonDisabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (isButtonDisabled || !secondaryAction) {
            return;
        }
        setIsButtonDisabled(true);
        secondaryAction();
    }, [isButtonDisabled, secondaryAction]);

    return (
        <>
            <div className="items-center flex overflow-x-hidden justify-center overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 modal-main">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    {/* Content */}
                    <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none modal-main-content">
                            {/* Header */}
                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[0.001px]">
                                <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/* Body */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/* Footer */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="modal-main-button flex flex-row justify-between gap-4">
                                        {secondaryAction && secondaryLabel && (
                                            <Button
                                                outline
                                                disabled={isButtonDisabled}
                                                label={secondaryLabel}
                                                onClick={handleSecondaryAction}
                                            />
                                        )}
                                        <Button
                                            disabled={isButtonDisabled}
                                            label={actionLabel}
                                            onClick={handleSubmit}
                                        />
                                    </div>
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modols;
