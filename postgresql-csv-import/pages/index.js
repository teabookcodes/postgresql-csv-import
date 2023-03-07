import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

export default function IndexPage() {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      ".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    // TODO: send formData to server or perform other action
    console.log(formData);
  };

  return (
    <Box maxW="700px" mx="auto" my={20} textAlign="center">
      <Heading as="h1" size="xl" mb={6}>
        Import your CSV file
      </Heading>
      <Box
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="gray.200"
        borderRadius="md"
        p={6}
        mb={6}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {file ? (
          <Text mb={3}>
            File uploaded: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
            MB)
          </Text>
        ) : (
          <Text mb={3}>
            Drag and drop your file here, or click to select file
          </Text>
        )}
        {file && (
          <Button colorScheme="blue" onClick={handleSubmit}>
            Send to database
          </Button>
        )}
      </Box>
    </Box>
  );
}
