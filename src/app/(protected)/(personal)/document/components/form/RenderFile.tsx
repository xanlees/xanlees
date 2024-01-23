import React from "react";
import FileDisplay from "../../../../../../common/components/cardFileDisplay/FileDisplay";
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
