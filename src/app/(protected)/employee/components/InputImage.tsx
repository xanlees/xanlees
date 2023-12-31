import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";

interface InputImageProps {
  control: any
  setValue: any
  name: string
  label: string
}

const InputImage: React.FC<InputImageProps> = ({ setValue, name, label }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file != null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue(name, file, { shouldValidate: true });
    }
  };
  const openFileInput = () => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="overflow-hidden bg-white rounded-lg w-72">
      <div className="">
        <div id="image-preview" className="items-center max-w-sm p-6 mx-auto mb-4 text-center bg-gray-100 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer">
          <PreviewImage previewUrl={previewUrl} label={label} />
          <input id="upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} ref={fileInputRef}/>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full">
            <button type="button" onClick={openFileInput} className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"> <span className="ml-2 text-center">Upload</span> </button >
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputImage;

const PreviewImage = ({
  previewUrl,
  label,
}: {
  previewUrl: string | null
  label: string
}) => {
  return (
    <label htmlFor="upload" className="cursor-pointer"> {previewUrl !== null ? <img src={previewUrl} alt="Preview" className="object-contain w-full h-full mx-auto mb-4 rounded-lg " /> : <> <Upload className="w-8 h-8 mx-auto mb-4 text-gray-700" /> <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700"> {label} </h5> <p className="text-sm font-normal text-gray-400 md:px-6"> Choose a photo (max size 2MB) in JPG, PNG, or GIF format. </p> <span id="filename" className="z-50 text-gray-500 bg-gray-200" /></>}
    </label>
  );
};
