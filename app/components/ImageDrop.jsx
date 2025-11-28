import {
  DropZone,
  LegacyStack,
  Thumbnail,
  Banner,
  List,
  Text,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

function DropZoneWithImageFileUpload() {
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      setFiles((files) => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
    },
    [],
  );

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name}{" "}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  );

  const errorMessage = hasError && (
    <Banner title="The following images couldn't be uploaded:" tone="critical">
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <LegacyStack vertical>
      {errorMessage}
      <DropZone
        actionTitle="add images"
        accept="image/*"
        type="image"
        onDrop={handleDrop}
      >
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    </LegacyStack>
  );
}

export default DropZoneWithImageFileUpload;
