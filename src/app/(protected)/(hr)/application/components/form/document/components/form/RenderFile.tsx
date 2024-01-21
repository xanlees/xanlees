import FileDisplay from "@src/common/components/cardFileDisplay/FileDisplay";
import React from "react";
interface DocumentFile {
  size: number
  name: string
}

interface RenderFileProps {
  field: {
    id: string
    documentName?: string
    documentFile?: DocumentFile | FileList
    profileId?: number
  }
  removeField: () => void
}
const RenderFile: React.FC<RenderFileProps> = ({ field, removeField }) => {
  const selected = field?.documentFile instanceof FileList ? field?.documentFile.item(0) ?? undefined : field?.documentFile as File;
  return (
    <FileDisplay
      documentName={field?.documentName}
      onRemove={removeField}
      file={selected}
    />
  );
};

export default RenderFile;
