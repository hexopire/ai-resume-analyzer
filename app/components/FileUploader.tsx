import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'


interface FileUploadProps {
    onFileSelect?: (file: File | null) => void;
}


const FileUploader = ({ onFileSelect }: FileUploadProps) => {


    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);

    }, [onFileSelect])
    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop, multiple: false, accept: { 'application/pdf': ['.pdf'] }, maxSize: maxFileSize })
    const file = acceptedFiles[0] || null;
    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {/* {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                } */}
                <div className='space-y-4 cursor-pointer'>
                    {file ? (
                        <div className='uploader-selected-file' onClick={(e) => e.stopPropagation()}>
                            <div className='flex items-center justify-between flex-1 ml-3'>
                                <img src='/images/pdf.png' alt='pdf' className='size-8' />
                                <div className='flex items-center space-x-3'>
                                    <p className='text-sm text-gray-700 font-medium truncate max-w-xs'>{file.name}</p>
                                    <p className='text-sm text-gray-500'>{formatSize(file.size)}</p>
                                </div>
                            </div>
                            <button className='p-2 cursor-pointer' onClick={(e) => {
                                onFileSelect?.(null)
                            }}>
                                <img src='/icons/cross.svg' alt='remove' className='w-4 h-4'/>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className='mx-auto w-16 h-16 flex items-center justify-center'>
                                <img src='/icons/info.svg' alt='upload' className='size-20' />
                            </div>
                            <p className='text-lg test-gray-500'>
                                <span className='font-semibold'>Click to Upload</span> or drag and drop
                            </p>
                            <p className='text-sm text-gray-500'>PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
export default FileUploader